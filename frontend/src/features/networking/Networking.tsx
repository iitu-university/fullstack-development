import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

type Repository = { id: number; full_name: string; html_url: string }
type Weather = {
  main: { temp: number }
  weather: { description: string; icon: string }[]
}

export function PromiseDemo() {
  const [message, setMessage] = useState('')
  const runThen = () => {
    new Promise<string>((resolve) => setTimeout(() => resolve('Hello'), 500))
      .then((result) => setMessage(result))
      .catch((error: Error) => setMessage(error.message))
  }
  const runError = () => {
    new Promise<string>((_resolve, reject) =>
      setTimeout(() => reject(new Error('Error')), 500),
    )
      .then((result) => setMessage(result))
      .catch((error: Error) => setMessage(error.message))
  }
  const run = async () => {
    try {
      const result = await new Promise<string>((resolve) =>
        setTimeout(() => resolve('Hello'), 500),
      )
      setMessage(result)
    } catch (error) {
      setMessage(String(error))
    }
  }
  return (
    <>
      <div className="actions">
        <button onClick={run}>Run</button>
        <button onClick={runThen}>Then</button>
        <button onClick={runError}>Reject</button>
      </div>
      <p>{message}</p>
    </>
  )
}

export function FetchPostDemo() {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body: 'Hello', userId: 1 }),
        },
      )
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'Error')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <button>POST</button>
      </form>
      <pre>{result}</pre>
    </>
  )
}

export function WeatherDemo() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${encodeURIComponent(key || '')}`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data: Weather) => setWeather(data))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
    return () => controller.abort()
  }, [])
  if (error) return <p>{error}</p>
  if (!weather) return <p>Loading...</p>
  return (
    <>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Description: {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
    </>
  )
}

export function GithubDemo() {
  const [keyword, setKeyword] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState('')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      const response = await axios.get<{ items: Repository[] }>(
        'https://api.github.com/search/repositories',
        { params: { q: keyword } },
      )
      setRepositories(response.data.items)
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.message : 'Error')
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Keyword
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>
        <button>Fetch</button>
      </form>
      {error ? (
        <p>{error}</p>
      ) : repositories.length === 0 ? (
        <p>No data available</p>
      ) : (
        <RepositoryTable repositories={repositories} />
      )}
    </>
  )
}

function RepositoryTable({ repositories }: { repositories: Repository[] }) {
  return (
    <table>
      <tbody>
        {repositories.map((repo) => (
          <tr key={repo.id}>
            <td>{repo.full_name}</td>
            <td>
              <a href={repo.html_url}>{repo.html_url}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const queryClient = new QueryClient()

function Repositories() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['repositories'],
    queryFn: async () => {
      const response = await axios.get<{ items: Repository[] }>(
        'https://api.github.com/search/repositories',
        { params: { q: 'react' } },
      )
      return response.data.items
    },
  })
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>
  return <RepositoryTable repositories={data} />
}

function FreshRepositories() {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['fresh-repositories'],
    queryFn: async () => {
      const response = await axios.get<{ items: Repository[] }>(
        'https://api.github.com/search/repositories',
        { params: { q: 'react' } },
      )
      return response.data.items
    },
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  })
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>
  return (
    <>
      <button onClick={() => refetch()}>Refetch</button>
      <RepositoryTable repositories={data} />
    </>
  )
}

export function CacheDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <FreshRepositories />
    </QueryClientProvider>
  )
}

export function ReactQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <Repositories />
    </QueryClientProvider>
  )
}

function Cars() {
  const [authorization, setAuthorization] = useState('')
  const [token, setToken] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const queryClient = useQueryClient()
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
  const headers = {
    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
  }

  const cars = useQuery({
    queryKey: ['cars', token],
    enabled: token.length > 0,
    retry: false,
    queryFn: async () => {
      const response = await axios.get<{
        _embedded: {
          cars: {
            brand: string
            model: string
            _links: { self: { href: string } }
          }[]
        }
      }>(`${apiUrl}/api/cars`, { headers })
      return response.data._embedded.cars
    },
  })

  const mutation = useMutation({
    mutationFn: async (car: { brand: string; model: string }) => {
      return axios.post(`${apiUrl}/api/cars`, car, { headers })
    },
    onSuccess: () => {
      setBrand('')
      setModel('')
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({ brand, model })
  }

  return (
    <>
      <label>
        Bearer token
        <input
          type="password"
          value={authorization}
          onChange={(event) => setAuthorization(event.target.value)}
        />
      </label>
      <button onClick={() => setToken(authorization.trim())}>Connect</button>
      {token && cars.isLoading && <p>Loading...</p>}
      {token && cars.isError && <p>Error...</p>}
      {cars.data && (
        <ul>
          {cars.data.map((car) => (
            <li key={car._links.self.href}>
              {car.brand} {car.model}
            </li>
          ))}
        </ul>
      )}
      {token && (
        <form onSubmit={handleSubmit}>
          <label>
            Brand
            <input
              required
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </label>
          <label>
            Model
            <input
              required
              value={model}
              onChange={(event) => setModel(event.target.value)}
            />
          </label>
          <button disabled={mutation.isLoading}>Add car</button>
        </form>
      )}
      {mutation.isError && <p>Error...</p>}
    </>
  )
}

export function MutationDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cars />
    </QueryClientProvider>
  )
}

export function RaceDemo() {
  const [user, setUser] = useState('octocat')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    let ignore = false
    setError('')
    setName('')
    fetch(`https://api.github.com/users/${encodeURIComponent(user)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data: { login: string }) => {
        if (!ignore) setName(data.login)
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [user])
  return (
    <>
      <div className="actions">
        <button onClick={() => setUser('octocat')}>octocat</button>
        <button onClick={() => setUser('torvalds')}>torvalds</button>
      </div>
      <p>{error || name || 'Loading...'}</p>
    </>
  )
}

function CarData({ carid, token }: { carid: number; token: string }) {
  const [car, setCar] = useState<{ brand: string; model: string } | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    const authorization = token.startsWith('Bearer ')
      ? token
      : `Bearer ${token}`
    setCar(null)
    setError('')
    fetch(`${apiUrl}/api/cars/${carid}`, {
      headers: { Authorization: authorization },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data: { brand: string; model: string }) => {
        if (!ignore) setCar(data)
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [carid, token])

  if (error) return <p>{error}</p>
  if (!car) return <p>Loading...</p>
  return (
    <p>
      {car.brand} {car.model}
    </p>
  )
}

export function CarRaceDemo() {
  const [authorization, setAuthorization] = useState('')
  const [token, setToken] = useState('')
  const [carid, setCarid] = useState(1)

  return (
    <>
      <label>
        Bearer token
        <input
          type="password"
          value={authorization}
          onChange={(event) => setAuthorization(event.target.value)}
        />
      </label>
      <button onClick={() => setToken(authorization.trim())}>Connect</button>
      <div className="actions">
        <button onClick={() => setCarid(1)}>Car 1</button>
        <button onClick={() => setCarid(2)}>Car 2</button>
      </div>
      {token && <CarData carid={carid} token={token} />}
    </>
  )
}
