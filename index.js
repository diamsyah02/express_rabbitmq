"use strict"

require('module-alias/register')
require('./pathAlias')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const receiver = require('@rabbits/receiver');
require('dotenv').config()

app.use(cors())
app.listen(process.env.PORT)
console.log('RESTful API server started on: ' + process.env.PORT)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// eksekusi reciever untuk selalu menerima message dari sender
receiver.productReceiver()
routes(app)