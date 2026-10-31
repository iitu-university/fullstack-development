function MyList() {
  const data = [1, 2, 3, 4, 5]

  return (
    <ul>
      {data.map((number) => (
        <li key={number}>Listitem {number}</li>
      ))}
    </ul>
  )
}

function MyTable() {
  const data = [
    { id: 1, brand: 'Ford', model: 'Mustang' },
    { id: 2, brand: 'VW', model: 'Beetle' },
    { id: 3, brand: 'Tesla', model: 'Model S' },
  ]

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Brand</th>
          <th scope="col">Model</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.brand}</td>
            <td>{item.model}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ListsDemo() {
  return (
    <>
      <p>{[1, 2, 3, 4].map((x) => x * 2).join(', ')}</p>
      <MyList />
      <MyTable />
    </>
  )
}

export default ListsDemo
