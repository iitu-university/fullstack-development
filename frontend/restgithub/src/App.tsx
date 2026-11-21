import { useState } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'

type Repository = {
  id: number
  full_name: string
  html_url: string
}

const columnDefs: ColDef<Repository>[] = [
  { field: 'id', sortable: true, filter: true },
  { field: 'full_name', sortable: true, filter: true },
  {
    field: 'html_url',
    sortable: true,
    filter: true,
    cellRenderer: (params: ICellRendererParams<Repository, string>) => (
      <a href={params.value ?? undefined}>{params.value}</a>
    ),
  },
  {
    headerName: 'Actions',
    field: 'full_name',
    cellRenderer: (params: ICellRendererParams<Repository, string>) => (
      <button type="button" onClick={() => alert(params.value)}>
        Press me
      </button>
    ),
  },
]

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
        <p role="alert">{error}</p>
      ) : (
        <div className="ag-theme-material repository-grid">
          <AgGridReact
            rowData={repositories}
            columnDefs={columnDefs}
            pagination
            paginationPageSize={8}
            overlayNoRowsTemplate="<span>No data available</span>"
          />
        </div>
      )}
    </>
  )
}

export default App
