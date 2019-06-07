const mongoose = require("mongoose")
const { Schema } = mongoose

const placesSchema = new Schema({
    place: String,
    coordinates: Object
})

const tripSchema = new Schema({
	title: String,
	_user: { type: Schema.Types.ObjectId, ref: "User" },
    stops: [placesSchema],
    numberOfStops: Number,
    distance: Object,
    duration: Object,
    creatorName: String,
    saves: Number
})

mongoose.model("trips", tripSchema)