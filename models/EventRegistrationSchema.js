const mongoose = require('mongoose')

const eventRegistrationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    participants: {type: Number, required: true},
    requests: {type: String}
})

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema)