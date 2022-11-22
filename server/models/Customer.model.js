const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorAddress: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)