import React from 'react'

const CurrentlyDisplay = ({ degree, summary, feelsLike }) => {
  return (
    <div className="temp-box">
      <h1 className="degree">{degree}&deg;</h1>
      <h5 className="weather">{summary}</h5>
      <h5>Feels like: {feelsLike}&deg;</h5>
    </div>
  )
}

export default CurrentlyDisplay
