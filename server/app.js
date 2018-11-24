require('dotenv').config()

const express = require('express')
const app = express()
const api = require('./api')
const cros = require('./middleware/cros')
const bodyParser = require('./middleware/bodyParser')

const host = process.env.HOST
const port = process.env.PORT

app.set('port', port)

// Listen the server
const server = app.listen(port, host)

// Online users list by country
app.locals.onlineUsers = {};

// Users who is searching partners
app.locals.searchingUsers = {}

app.use(cros)
app.use(bodyParser)
app.use('/api', api)

module.exports = { app, server }