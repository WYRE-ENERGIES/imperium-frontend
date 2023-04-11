import {
  getCurrentDate,
  getHourFromDate,
  getItemFromLocalStorage,
  saveToLocalStorage,
} from '../utils/helpers'
import { useEffect, useState } from 'react'

import axios from 'axios'

const useWeather = () => {
  const [coord, setCoord] = useState({
    lat: null,
    long: null,
  })
  const [weatherResult, setWeatherResult] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

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

          const list = result?.data?.list
          const weatherReport = []

          for (let index = 0; index < 8; index++) {
            const item = list[index]

            weatherReport.push({
              time: getHourFromDate(item.dt_txt),
              season: item.sys.pod,
              temp: item.main.temp,
              weather: item.weather[0].main,
              description: item.weather[0].description,
            })
          }
          const city = result?.data?.city?.name

          saveToLocalStorage(
            'weather_info',
            { weatherReport, city },
            getCurrentDate(),
          )
          setWeatherResult({ weatherReport, city })
          setIsLoading(false)
        }
      } catch (error) {
        setError(true)
      }
    }

    const weatherInfo = getItemFromLocalStorage(
      'weather_info',
      getCurrentDate(),
    )

    if (weatherInfo) {
      console.log({ weatherInfo })
      setWeatherResult(weatherInfo)
      setIsLoading(false)
    } else {
      fetchWeatherData()
    }
  }, [coord.lat, coord.long])

  return [coord, weatherResult, isLoading, error]
}

export default useWeather
