// main file
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// routes
const routes = require('./src/routes/index')

// initialization
const app = express()
const dbUrl = `mongodb://localhost:contempo-node-api/contempo-node-api`

// DB Setup
mongoose.connect(dbUrl)

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sample route
routes(app)

module.exports = app
