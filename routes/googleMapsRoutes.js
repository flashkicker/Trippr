const key = require("../config/keys").googleMapsKey
const googleMapsClient = require("@google/maps").createClient({
	key,
	Promise: Promise
})

module.exports = app => {
	app.post("/api/maps", async (req, res) => {
		const response = await googleMapsClient
			.placesQueryAutoComplete({
				input: Object.keys(req.body)[0],
				language: "en"
			})
            .asPromise()

		const places = response.json.predictions.map(place => {
            const { description, place_id } = place
			return { description, place_id }
        })

		res.send(places)
    })
}
