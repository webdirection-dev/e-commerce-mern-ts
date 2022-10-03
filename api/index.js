const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()
const mongoSetting = {useNewUrlParser: true, useUnifiedTopology: true}

const authRoot = require('./routes/auth')
const userRoot = require('./routes/user')
const productRoot = require('./routes/product')
const cartRoot = require('./routes/cart')
const orderRoot = require('./routes/order')
const stripeRoot = require('./routes/stripe')

mongoose
    .connect(process.env.MONGO_URL, mongoSetting)
    .then(() => console.log('DB Connection Success!'))
    .catch(err => console.error(err))

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoot)
app.use('/api/users', userRoot)
app.use('/api/products', productRoot)
app.use('/api/carts', cartRoot)
app.use('/api/orders', orderRoot)
app.use('/api/checkout', stripeRoot)

app.listen(process.env.PORT || 8800, () => {console.log('Backend Server Is Running!')})