require('dotenv').config()

const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const api = require('./api')
const socket = require('./socket')

const host = process.env.HOST
const port = process.env.PORT

app.set('port', port)

// Listen the server
const server = app.listen(port, host)
const io = require('socket.io').listen(server)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')




async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console

} 
start()

// Online users list by country
app.locals.onlineUsers = {};

// Users who is searching partners
app.locals.searchingUsers = {}

socket.start(io, app)
app.use('/api', api)