import { useState } from 'react'

function SeparateStateForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Hello ${firstName} ${lastName}`)
  }

  return (
    <section className="example" aria-label="Три отдельных состояния">
      <form onSubmit={handleSubmit}>
        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <input type="submit" value="Press me" />
      </form>
    </section>
  )
}

export default SeparateStateForm
