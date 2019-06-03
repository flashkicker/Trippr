const key = require("../config/keys").googleMapsClient
const googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyAZn7wclMHXGAiymldyKJn1qAdDM84vk5A",
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
