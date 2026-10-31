import { useState } from 'react'
import PropTypes from 'prop-types'

function Login() {
  return <p>Login</p>
}

function Logout() {
  return <p>Logout</p>
}

function AuthWithIf({ isLoggedin }) {
  if (isLoggedin) {
    return <Logout />
  }

  return <Login />
}

AuthWithIf.propTypes = { isLoggedin: PropTypes.bool.isRequired }

function ConditionalDemo() {
  const [isLoggedin, setIsLoggedin] = useState(false)

  return (
    <>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isLoggedin}
          onChange={(event) => setIsLoggedin(event.target.checked)}
        />
        Пользователь вошёл
      </label>
      <section className="example" aria-label="Условие if">
        <AuthWithIf isLoggedin={isLoggedin} />
      </section>
      <section className="example" aria-label="Тернарный оператор">
        {isLoggedin ? <Logout /> : <Login />}
      </section>
    </>
  )
}

export default ConditionalDemo
