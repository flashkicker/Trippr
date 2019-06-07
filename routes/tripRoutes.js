const mongoose = require("mongoose")
const _ = require("lodash")
const faker = require("faker")
const Trip = mongoose.model("trips")
const User = mongoose.model("users")

const key = require("../config/keys").googleMapsKey
const googleMapsClient = require("@google/maps").createClient({
	key,
	Promise: Promise
})

module.exports = app => {
	app.post("/api/trips", async (req, res) => {
		const { title } = req.body
		const stops = await extractStopsFromBody(req.body)
		const { distance, duration } = await travelTimeAndDistanceCalculator(stops)

		const trip = new Trip({
			title,
			_user: req.user.id,
			stops,
			numberOfStops: stops.length - 2,
			distance,
			duration,
			creatorName: req.user.firstName,
			saves: 0
		})

		await trip.save()

		res.sendStatus(200)
	})

	app.get("/api/trips", async (req, res) => {
		const trips = await Trip.find().limit(20)

		res.status(200).send(trips)
	})

	app.get("/api/mytrips", async (req, res) => {
		const trips = await Trip.find({ _user: req.user.id })

		res.status(200).send(trips)
	})

	app.get("/api/trip", async (req, res) => {
		const trip = await Trip.find({ _id: req.query.id })

		res.status(200).send(trip)
	})

	app.patch("/api/trip", async (req, res) => {
		const { title } = req.body
		const _id = req.query.id
		const stops = await extractStopsFromBody(req.body)
		const { distance, duration } = await travelTimeAndDistanceCalculator(stops)

		if (mongoose.Types.ObjectId.isValid(_id)) {
			const updatedTrip = await Trip.findOneAndUpdate(
				{
					_id
				},
				{
					$set: {
						title,
						stops,
						numberOfStops: stops.length - 2,
						distance,
						duration,
						creatorName: req.user.firstName
					}
				},
				{ new: true }
			)

			if (updatedTrip !== null) {
				res.status(200).send(updatedTrip)
			}
		}
	})

	app.delete("/api/trip", async (req, res) => {
		const _id = req.query.id

		if (mongoose.Types.ObjectId.isValid(_id)) {
			await Trip.findByIdAndDelete(_id)

			res.sendStatus(200)
		}
	})

	app.post("/api/savetrip", async (req, res) => {
		const _id = req.query.id

		try {
			if (mongoose.Types.ObjectId.isValid(_id)) {
				await User.findOneAndUpdate(
					{
						_id: req.user._id
					},
					{ $push: { savedTrips: _id } },
					{ new: true }
				)

				await Trip.findOneAndUpdate(
					{ _id },
					{ $inc: { saves: 1 } },
					{ new: true }
				)
			}

			res.sendStatus(200)
		} catch (e) {
			console.log(e)
		}
	})

	app.post("/api/unsavetrip", async (req, res) => {
		const _id = req.query.id

		try {
			if (mongoose.Types.ObjectId.isValid(_id)) {
				await User.findOneAndUpdate(
					{
						_id: req.user._id
					},
					{ $pull: { savedTrips: _id } },
					{ new: true }
				)

				await Trip.findOneAndUpdate(
					{ _id },
					{ $inc: { saves: -1 } },
					{ new: true }
				)
			}

			res.sendStatus(200)
		} catch (e) {
			console.log(e)
		}
	})

	app.get("/api/savedtrips", async (req, res) => {
		try {
			if (req.user) {
				const trips = await User.find({
					_id: req.user._id
				})

				res.status(202).send(trips[0].savedTrips)
			} else {
				res.sendStatus(200)
			}
		} catch (e) {
			console.log(e)
		}
	})
}

const getCoordinates = async query => {
	const response = await googleMapsClient
		.places({
			query
		})
		.asPromise()

	const { lat, lng } = response.json.results[0].geometry.location

	return { lat, lng }
}

const mapPlacesToCoordinates = async places => {
	let map = []

	for (const place of places) {
		const coordinates = await getCoordinates(place)
		map.push({
			place,
			coordinates
		})
	}

	return map
}

const extractStopsFromBody = async body => {
	const { origin, destination, stops } = body

	let places = [origin]

	if (stops.length) {
		stops.forEach(stop => {
			places.push(stop)
		})
	}

	places.push(destination)

	return await mapPlacesToCoordinates(places)
}

const travelTimeAndDistanceCalculator = async stops => {
	let waypoints = null

	for (let i = 1; i < stops.length - 1; i++) {
		if (stops.length > 2) {
			waypoints = waypoints + "|via:" + stops[i].place
		}
	}

	try {
		const response = await googleMapsClient
			.directions({
				origin: stops[0].place,
				destination: _.last(stops).place,
				waypoints,
				departure_time: "now"
			})
			.asPromise()

		const { distance, duration } = response.json.routes[0].legs[0]

		return { distance, duration }
	} catch (e) {
		console.log(e)
	}
}
