function Es6Demo() {
  class Person {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName
      this.lastName = lastName
    }
  }

  class Employee extends Person {
    title: string
    salary: number

    constructor(
      firstName: string,
      lastName: string,
      title: string,
      salary: number,
    ) {
      super(firstName, lastName)
      this.title = title
      this.salary = salary
    }
  }

  const calc = (x: number) => x * 2
  const calcSum = (x: number, y: number) => x + y
  const sayHello = () => 'Hello'

  const PI = 3.14159
  let count = 10
  let blockTotal: number | undefined

  if (count > 5) {
    const total = count * 2
    blockTotal = total
  }

  count += 1
  const myObj = { foo: 3 }
  myObj.foo = 5
  const numbers = [1, 2, 3, 4]
  numbers.push(5)
  const person = {
    firstName: 'John',
    lastName: 'Johnson',
    email: 'j.johnson@mail.com',
  }
  const { firstName, lastName, email } = person
  const greeting = `Hello ${firstName} ${lastName}`
  const employee = new Employee(firstName, lastName, 'Developer', 5000)

  const examples = {
    PI,
    count,
    blockTotal,
    objectProperty: myObj.foo,
    array: numbers,
    doubled: [1, 2, 3, 4].map((x) => x * 2),
    calc: calc(5),
    sum: calcSum(2, 3),
    hello: sayHello(),
    greeting,
    email,
    employee,
  }

  return <pre>{JSON.stringify(examples, null, 2)}</pre>
}

export default Es6Demo
