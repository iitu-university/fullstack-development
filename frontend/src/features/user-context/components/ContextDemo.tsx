import { createContext, useContext, useState } from 'react'

const AuthContext = createContext('')

function UserGreeting() {
  const userName = useContext(AuthContext)

  return <p>Welcome {userName}</p>
}

function ContextDemo() {
  const [userName, setUserName] = useState('john')

  return (
    <>
      <label>
        Имя в контексте
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
      <AuthContext.Provider value={userName}>
        <div className="example">
          <UserGreeting />
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default ContextDemo
