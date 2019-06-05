const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
	googleID: String,
	savedTrips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
	firstName: String,
	lastName: String
})

mongoose.model('users', userSchema)