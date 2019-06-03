const mongoose = require("mongoose")
const Trip = mongoose.model("trips")

const googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyAZn7wclMHXGAiymldyKJn1qAdDM84vk5A",
	Promise: Promise
})

module.exports = app => {
	app.post("/api/trips", async (req, res) => {
		const { title } = req.body

		const trip = new Trip({
			title,
			_user: req.user.id
		})

		await trip.save()

		res.sendStatus(200)
	})

	app.get("/api/trips", async (req, res) => {
		const trips = await Trip.find().limit(20)

		res.send(trips)
	})

	app.get("/api/trip", async (req, res) => {
		const trip = await Trip.find({ _id: req.query.id })

		res.send(trip)
	})

	app.patch("/api/trip", async (req, res) => {
		const { title, origin, destination, stops } = req.body
		const _id = req.query.id

		let places = [origin]

		stops.forEach((stop) => { places.push(stop) })

		places.push(destination)

		places = await mapPlacesToCoordinates(places)

		console.log(places)

		if (mongoose.Types.ObjectId.isValid(_id)) {
			const updatedTrip = await Trip.findOneAndUpdate(
				{
					_id,
					_user: req.user.id
				},
				{ $set: { title } },
				{ new: true }
			)

			if (updatedTrip !== null) {
				res.send(updatedTrip)
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

const mapPlacesToCoordinates = async (places) => {
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