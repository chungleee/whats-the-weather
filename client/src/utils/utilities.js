// unix timestamp converter
export const handleUnixToDay = unix_timestamp => {
  const date = new Date(unix_timestamp * 1000)
  return date.toLocaleString()
}

// unix timestamp to hours
export const handleUnixToHours = unix_timestamp => {
  const date = new Date(unix_timestamp * 1000)
  return date.getHours().toString()
}

// F to C converter
export const handleFtoC = f => {
  const c = ((f - 32) * 5) / 9
  return Math.round(c).toString()
}

// import images with webpack require.context
export const importAll = r => {
  let images = {}
  r.keys().forEach(image => {
    images[
      image
        .replace('./', '')
        .replace(/-/g, '')
        .replace('.jpg', '')
    ] = r(image)
  })
  return images
}

// get location
export const handleGetLocation = () => {
  return new Promise((resolve, reject) => {
    // success cb
    const success = position => {
      resolve(position)
    }
    // error cb
    const error = err => {
      reject(alert(`ERROR(${err.code}): ${err.message}`))
    }
    // options obj
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      reject('Geolocation is NOT available')
    }
  })
}
