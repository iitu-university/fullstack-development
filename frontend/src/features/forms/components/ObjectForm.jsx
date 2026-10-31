import { useState } from 'react'

function ObjectForm() {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Hello ${user.firstName} ${user.lastName}`)
  }

  return (
    <section className="example" aria-label="Объект user и один обработчик">
      <form onSubmit={handleSubmit}>
        <label>
          First name
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </section>
  )
}

export default ObjectForm
