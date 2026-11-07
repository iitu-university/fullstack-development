export type HelloProps = {
  name: string
  age: number
}

function HelloComponent({ name, age }: HelloProps) {
  return (
    <p>
      Hello {name}, you are {age} years old!
    </p>
  )
}

export default HelloComponent
