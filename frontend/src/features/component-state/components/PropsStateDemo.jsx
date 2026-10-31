import { useState } from 'react'
import PropTypes from 'prop-types'
import HeaderText from './HeaderText'

function Hello(props) {
  return <p>Hello {props.user}</p>
}

Hello.propTypes = { user: PropTypes.string.isRequired }

function FullName({ firstName, lastName }) {
  return (
    <p>
      Hello {firstName} {lastName}
    </p>
  )
}

FullName.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

function Expression({ count }) {
  return <p>2 + 2 = {count}</p>
}

Expression.propTypes = { count: PropTypes.number.isRequired }

function PropsStateDemo() {
  const [name, setName] = useState('Jim')
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Johnson')
  const [person, setPerson] = useState({
    firstName: 'John',
    lastName: 'Johnson',
  })

  return (
    <>
      <section className="example" aria-label="Props">
        <HeaderText text="Hello React" />
        <Hello user="John" />
        <FullName firstName="John" lastName="Johnson" />
        <Expression count={2 + 2} />
      </section>
      <section className="example" aria-label="Простое состояние">
        <Hello user={name} />
        <button onClick={() => setName('John')}>Jim → John</button>
      </section>
      <section className="example" aria-label="Два состояния">
        <FullName firstName={firstName} lastName={lastName} />
        <button
          onClick={() => {
            setFirstName('Jim')
            setLastName('Palmer')
          }}
        >
          Два setter: Jim Palmer
        </button>
      </section>
      <section className="example" aria-label="Объект в состоянии">
        <FullName firstName={person.firstName} lastName={person.lastName} />
        <div className="actions">
          <button
            onClick={() => setPerson({ firstName: 'Jim', lastName: 'Palmer' })}
          >
            Заменить объект
          </button>
          <button
            onClick={() =>
              setPerson((previous) => ({ ...previous, firstName: 'Jim' }))
            }
          >
            Изменить только имя
          </button>
        </div>
      </section>
    </>
  )
}

export default PropsStateDemo
