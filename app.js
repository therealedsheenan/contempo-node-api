// main file
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

//routes
const index= require('./src/routes/index')

// initialization
const app = express()
const dbUrl = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@127.0.0.1`;

// DB Setup
mongoose.connect(dbUrl)

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))

// sample route
index(app)

module.exports = app
