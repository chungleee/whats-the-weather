import React from 'react'

const NextTwentyFour = ({ hours }) => {
  const currentIconObj = {
    clearday: 'uil uil-sun',
    clearnight: 'uil uil-moonset',
    rain: 'uil uil-cloud-showers',
    snow: 'uil uil-snowflake',
    sleet: 'uil uil-cloud-hail',
    wind: 'uil uil-wind',
    fog: 'uil uil-cloud-set',
    cloudy: 'uil uil-clouds',
    partlycloudyday: 'uil uil-cloud-sun',
    partlycloudynight: 'uil uil-cloud-moon'
  }
  return (
    <div className="hourly-block">
      {hours.map((hour, index) => {
        return (
          <div key={index} className="hourly-block-items">
            <h3>{hour.tempInC}&deg;</h3>
            <h3>
              <i className={currentIconObj[hour.hourIcon]} />
            </h3>
            <h3>{hour.currentTime}:00</h3>
          </div>
        )
      })}
    </div>
  )
}

export default NextTwentyFour
