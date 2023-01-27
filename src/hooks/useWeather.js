import {
  getCurrentDate,
  getItemFromLocalStorage,
  saveToLocalStorage,
} from '../utils/helpers'
import { useEffect, useState } from 'react'

import axios from 'axios'

export const useWeather = () => {
  const [coord, setCoord] = useState({
    lat: null,
    long: null,
  })
  const [weatherResult, setWeatherResult] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }))
      })

      try {
        if (coord.lat && coord.long) {
          const result = await axios.get(
            `${process.env.REACT_APP_OPENWEATHER_API_BASEURL}/forecast/?lat=${coord.lat}&lon=${coord.long}&units=metric&APPID=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
          )
          saveToLocalStorage('weather_info', result.data, getCurrentDate())
          setWeatherResult(result.data)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    const weatherInfo = getItemFromLocalStorage(
      'weather_info',
      getCurrentDate(),
    )

    setIsLoading(true)

    if (weatherInfo) {
      setWeatherResult(weatherInfo)
    } else {
      fetchWeatherData()
    }
  }, [coord.lat, coord.long])

  return [coord, weatherResult, isLoading, error]
}
