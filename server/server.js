const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/pharmacy')
  .then(res => {
    console.log("Connected to mongodb.")
  })
  .catch(error => console.log(error));

// importing model
const Customer = require('./models/Customer.model')


app.get('/api/customer/:id', (req, res) => {
  Customer
    .findById(req.params.id)
    .then(customer => {
      if (customer) {
        res.status(200).json(customer)
      }
    })
    .catch(err => res.status(400).json({ error: err.message }))
})

app.put('/api/customer/:id', (req, res) => {
  let updateData = {
    ...req.body
  }
  if (updateData.hasOwnProperty('customerName')) {
    delete updateData['customerName']
  }
  Customer
    .findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(updatedCustomer => {
      res.json(updatedCustomer)
    })
    .catch(err => res.status(400).json({ error: err.message }))
})

app.delete('/api/customer/:id', (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => res.status(400).json({ error: err.message }))
})

app.get('/api/customer', (req, res) => {
    Customer
        .find({})
        .then(customers => {
            res.status(200).json(customers)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ error: err.message});
        })
})

app.post('/api/customer', (req, res) => {
    const newCustomer = new Customer({
        ...req.body
    })
    newCustomer
    .save()
    .then(savedCustomer => {
      res.status(201).json(savedCustomer)
    })
    .catch(err => { 
      console.log(err)
      res.status(400).json({ error: err.message});
    })
})


const Invoice = require('./models/Invoice.model')

app.get('/api/invoice/:id', (req, res) => {
  Invoice
    .findById(req.params.id)
    .then(invoice => {
      if (invoice) {
        res.status(200).json(invoice)
      }
    })
    .catch(err => res.status(400).json({ error: err.message }))
})

app.get('/api/invoice', (req, res) => {
  Invoice
      .find({})
      .then(invoices => {
          res.status(200).json(invoices)
      })
      .catch(err => {
          console.log(err)
          res.status(400).json({ error: err.message});
      })
})

app.post('/api/invoice', (req, res) => {
  const newInvoice = new Invoice({
      ...req.body
  })
  newInvoice
  .save()
  .then(savedInvoice => {
    res.status(201).json(savedInvoice)
  })
  .catch(err => { 
    console.log(err)
    res.status(400).json({ error: err.message});
  })
})


app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`)
})