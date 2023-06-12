import { useState, useEffect } from 'react'

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCurrentCoordinates = async () => {
      try {
        // eslint-disable-next-line no-undef
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position)
            },
            (error) => {
              reject(error)
            },
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
            },
          )
        })
        setLocation((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }))
      } catch (error) {
        setError(error)
      }
    }

    getCurrentCoordinates()
  }, [])
  return { location, error }
}

export default useCurrentLocation
