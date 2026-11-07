import HelloComponent from './HelloComponent'
import HelloArrowComponent from './HelloArrowComponent'

type OptionalHelloProps = {
  name: string
  age?: number
}

function OptionalHello({ name, age }: OptionalHelloProps) {
  if (age === undefined) {
    return <p>Hello {name}</p>
  }

  return (
    <p>
      Hello {name}, you are {age} years old!
    </p>
  )
}

function GreetingButton({ fn }: { fn: () => void }) {
  return <button onClick={fn}>Hello</button>
}

function MessageButton({ fn }: { fn: (message: string) => void }) {
  return <button onClick={() => fn('Hello Mary')}>Hello Mary</button>
}

function TypedPropsDemo() {
  const sayHello = (): void => {
    alert('Hello')
  }

  const showMessage = (message: string): void => {
    alert(message)
  }

  return (
    <>
      <HelloComponent name="Mary" age={12} />
      <HelloArrowComponent name="John" age={30} />
      <OptionalHello name="Lisa" />
      <OptionalHello name="Jim" age={25} />
      <div className="actions">
        <GreetingButton fn={sayHello} />
        <MessageButton fn={showMessage} />
      </div>
    </>
  )
}

export default TypedPropsDemo
