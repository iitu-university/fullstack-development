import { useState } from 'react'

function Login() {
  return <p>Login</p>
}

function Logout() {
  return <p>Logout</p>
}

function AuthWithIf({ isLoggedin }: { isLoggedin: boolean }) {
  if (isLoggedin) {
    return <Logout />
  }

  return <Login />
}

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
