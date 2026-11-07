import { useState } from 'react'
import useTitle from '../../../shared/hooks/useTitle'

function Counter() {
  const [count, setCount] = useState(0)
  useTitle(`You clicked ${count} times`)

  return (
    <>
      <p>Counter = {count}</p>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>
    </>
  )
}

export default Counter
