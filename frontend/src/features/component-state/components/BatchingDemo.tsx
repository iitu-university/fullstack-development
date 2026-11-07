import { useState } from 'react'
import { flushSync } from 'react-dom'

function BatchingDemo() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const increment = () => {
    setCount((previous) => previous + 1)
    setCount2((previous) => previous + 1)
  }

  const incrementSynchronously = () => {
    flushSync(() => {
      setCount((previous) => previous + 1)
    })
    setCount2((previous) => previous + 1)
  }

  return (
    <>
      <p>
        Counters: {count} {count2}
      </p>
      <div className="actions">
        <button onClick={increment}>Increment both</button>
        <button onClick={incrementSynchronously}>
          Increment with flushSync
        </button>
      </div>
    </>
  )
}

export default BatchingDemo
