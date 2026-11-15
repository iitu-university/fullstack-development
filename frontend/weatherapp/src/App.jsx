import { useEffect, useState } from 'react'

function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${encodeURIComponent(key || '')}`

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((result) =>
        setWeather({
          temp: result.main.temp,
          desc: result.weather[0].main,
          icon: result.weather[0].icon,
        }),
      )
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })

    return () => controller.abort()
  }, [])

  if (error) return <p>{error}</p>
  if (!weather) return <p>Loading...</p>
  return (
    <>
      <p>Temperature: {weather.temp} °C</p>
      <p>Description: {weather.desc}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="Weather icon"
      />
    </>
  )
}

export default App
