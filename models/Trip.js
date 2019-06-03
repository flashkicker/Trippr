const mongoose = require("mongoose")
const { Schema } = mongoose

const tripSchema = new Schema({
    title: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

mongoose.model("trips", tripSchema)