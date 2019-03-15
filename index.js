const express = require('express')
const morgan = require('morgan')
const axios = require('axios')
const googleMapsClient = require('@google/maps')

// keys
const { darkSkyKey, googleMapsKey } = require('./config/keys')

// init app
const app = express()

// middlewares
app.use(morgan('tiny'))

// init google maps
googleMapsClient.createClient({
  key: googleMapsKey,
  Promise: Promise
})

// api endpoints
app.get('/currently/:latitude,:longitude', (req, res) => {
  const latitude = req.params.latitude
  const longitude = req.params.longitude

  axios
    .get(
      `https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude}`
    )
    .then(response => {
      console.log(response.data)
      res.status(200).json(response.data)
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/location/:latitude,:longitude', (req, res) => {
  const latitude = req.params.latitude
  const longitude = req.params.longitude

  googleMapsClient
    .reverseGeocode({
      latlng: [latitude, longitude]
    })
    .asPromise()
    .then(response => {
      console.log(response)
      res.status(200).json(response.json)
    })
    .catch(error => {
      console.log(error)
    })
})

// server setup
const PORT = 8080 || process.env.PORT
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})