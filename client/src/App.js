import React, { Component } from 'react'
import {
  handleGetLocation,
  handleFtoC,
  handleUnixToDay,
  handleUnixToHours,
  importAll
} from './utils/utilities'
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay'
import CurrentlyDisplay from './components/CurrentlyDisplay'
import DarkSkyAttribution from './components/DarkSkyAttribution'
import NextTwentyFour from './components/NextTwentyFour'

class App extends Component {
  state = {
    loading: true,

    // images
    images: {},

    // fetched data
    currently: {},
    minutely: {},
    hourly: {},
    daily: {},

    // modified data
    // current
    currentTemperatureInC: '',
    currentTime: '',
    currentLocation: '',
    currentIcon: '',
    // hour
    hours: []
  }

  componentDidMount() {
    const images = importAll(require.context('./img', false, /\.(jpg|png)$/))

    this.setState({
      images
    })

    handleGetLocation()
      .then(position => {
        this.handleGetWeather(position.coords)
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidUpdate(_, prevState) {
    if (this.state.hourly !== prevState.hourly) {
      const { hourly } = this.state
      const hours = []

      // 1. loop through hourly.data.temperature
      hourly.data.slice(0, 24).forEach((hour, idx) => {
        // 2.	convert temperature to C
        const tempInC = handleFtoC(hour.temperature)
        // 3. convert unix time
        const currentTime = handleUnixToHours(hour.time)
        // set icon
        const hourIcon = hour.icon.replace(/-/g, '')
        // 4. put in obj
        const obj = {
          tempInC,
          currentTime,
          hourIcon
        }
        // 5. push into hours array
        hours.push(obj)
      })
      // 6. set state
      this.setState({
        hours
      })
    } else {
      console.log('false')
    }
  }

  // request to get weather json data
  handleGetWeather = coords => {
    // concurrent get requests
    axios
      .all([
        axios.get(`/currently/${coords.latitude},${coords.longitude}`),
        axios.get(`/location/${coords.latitude},${coords.longitude}`)
      ])
      .then(
        axios.spread((currently, location) => {
          // convert f to c
          const currentTemperatureInC = handleFtoC(
            currently.data.currently.temperature
          )

          // convert unix timestamp to local time
          const currentTime = handleUnixToDay(currently.data.currently.time)

          // assign address to variable
          const currentLocation = location.data.results[0].formatted_address

          // set state
          this.setState({
            loading: !this.state.loading,
            currently: currently.data.currently,
            minutely: currently.data.minutely,
            hourly: currently.data.hourly,
            daily: currently.data.daily,
            currentIcon: currently.data.currently.icon.replace(/-/g, ''),
            currentTemperatureInC,
            currentTime,
            currentLocation
          })
        })
      )
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    // destructuring
    const {
      currentIcon,
      currentTemperatureInC,
      currently,
      currentTime,
      currentLocation,
      hours
    } = this.state

    // convert feelslike temp
    const feelsLike = handleFtoC(currently.apparentTemperature)
    if (this.state.loading) {
      return (
        <div className="bolt">
          <i className="uil uil-bolt-alt" />
          <div>loading forecast</div>
        </div>
      )
    } else {
      return (
        <div
          className="background"
          style={{ backgroundImage: `url(${this.state.images[currentIcon]})` }}
        >
          <div className="background-overlay" />
          <div className="container">
            <LocationDisplay
              lastUpdated={currentTime}
              currentLocation={currentLocation}
            />
            <CurrentlyDisplay
              degree={currentTemperatureInC}
              summary={currently.summary}
              feelsLike={Number.isNaN(feelsLike) ? '' : feelsLike}
            />
            <NextTwentyFour hours={hours} currentIcon={currentIcon} />

            <DarkSkyAttribution />
          </div>
        </div>
      )
    }
  }
}

export default App
