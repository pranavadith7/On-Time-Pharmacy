const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['Cash', 'Card', 'Net Banking'],
        default: 'Cash',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    medicine: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            mrp: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
            }
        }
    ],
    totalAmount: {
        type: Number
    },
    totalDiscount: {
        type: Number
    },
    netTotal: {
        type: Number
    },
    amountPaid: {
        type: Number
    },
    change: {
        type: Number
    }
})

module.exports = mongoose.model('Invoice', invoiceSchema)