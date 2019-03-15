import React from 'react'

const LocationDisplay = ({ lastUpdated, currentLocation }) => {
  return (
    <div className="location-box">
      <h3 className="city">{currentLocation}</h3>
      <h5 className="date">Last updated: {lastUpdated}</h5>
    </div>
  )
}

export default LocationDisplay
