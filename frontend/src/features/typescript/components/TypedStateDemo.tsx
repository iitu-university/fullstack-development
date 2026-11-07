import { useState } from 'react'

function TypedStateDemo() {
  type User = {
    id: number
    name: string
    email: string
  }

  const [isReady, setReady] = useState(false)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)
  const [optionalMessage, setOptionalMessage] = useState<string | undefined>(
    undefined,
  )
  const [user, setUser] = useState<User>({ id: 0, name: '', email: '' })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isReady}
          onChange={(event) => setReady(event.target.checked)}
        />
        Ready
      </label>
      <label>
        Message
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <p>Counter = {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <section className="example" aria-label="Optional message">
        <p>{optionalMessage ?? 'undefined'}</p>
        <div className="actions">
          <button onClick={() => setOptionalMessage('Hello')}>
            Set message
          </button>
          <button onClick={() => setOptionalMessage(undefined)}>
            Clear message
          </button>
        </div>
      </section>
      <section className="example" aria-label="User">
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button
          onClick={() =>
            setUser({ id: 1, name: 'John', email: 'john@mail.com' })
          }
        >
          Set user
        </button>
      </section>
      <section className="example" aria-label="Nullable user">
        <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
        <div className="actions">
          <button
            onClick={() =>
              setSelectedUser({ id: 2, name: 'Mary', email: 'mary@mail.com' })
            }
          >
            Select user
          </button>
          <button onClick={() => setSelectedUser(null)}>Clear user</button>
        </div>
      </section>
    </>
  )
}

export default TypedStateDemo
