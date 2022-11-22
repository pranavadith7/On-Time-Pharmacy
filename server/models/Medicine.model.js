const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Medicine', medicineSchema)