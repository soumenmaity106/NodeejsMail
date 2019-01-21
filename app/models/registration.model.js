const mongoose = require('mongoose');
const RegistrationSchema = mongoose.Schema({
    coursename: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, require: true },
    confirmationid: { type: String },
})
module.exports = mongoose.model('Registrations', RegistrationSchema)