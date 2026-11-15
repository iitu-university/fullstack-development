import { useState } from 'react'
import axios from 'axios'

type Repository = {
  id: number
  full_name: string
  html_url: string
}

function App() {
  const [keyword, setKeyword] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      const response = await axios.get<{ items: Repository[] }>(
        'https://api.github.com/search/repositories',
        {
          params: { q: keyword },
        },
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
          Keyword{' '}
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
      )}
    </>
  )
}

export default App
