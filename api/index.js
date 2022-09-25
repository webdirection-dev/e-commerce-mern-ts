const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')

const userRoot = require('./routes/user')

const app = express()
const mongoSetting = {useNewUrlParser: true, useUnifiedTopology: true}

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL, mongoSetting)
    .then(() => console.log('DB Connection Success!'))
    .catch(err => console.error(err))

app.use(express.json())
app.use('/api/users', userRoot)

app.listen(process.env.PORT || 8800, () => {console.log('Backend Server Is Running!')})