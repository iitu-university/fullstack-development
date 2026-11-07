function TypesDemo() {
  interface Student {
    id: number
    name: string
    email: string
  }

  type StudentDetails = {
    id: number
    name: string
    email?: string
  }

  type Person = {
    name: string
    email: string
    address?: {
      street: string
      city: string
    }
  }

  type InputType = string | number
  type Fuel = 'diesel' | 'gasoline' | 'electric'
  type NoOfGears = 5 | 6 | 7

  type Car = {
    brand: string
    fuel: Fuel
    gears: NoOfGears
  }

  let message = 'Hello'
  message = 'Hello TypeScript'

  const email: string = 'john@mail.com'
  const age: number = 30
  const isActive: boolean = true
  const externalValue: unknown = 'External value'
  const arrayOfNums: number[] = [1, 2, 3, 4]
  const animals: Array<string> = ['Dog', 'Cat', 'Tiger']

  const student: Student = {
    id: 1,
    name: 'Lisa Smith',
    email: 'lisa.s@mail.com',
  }

  const studentWithoutEmail: StudentDetails = {
    id: 2,
    name: 'Lisa Smith',
  }

  const person: Person = {
    name: 'John Johnson',
    email: 'j.j@mail.com',
  }

  const name: InputType = 'Hello'
  const number: InputType = 12
  const car: Car = { brand: 'Ford', fuel: 'gasoline', gears: 6 }

  const examples = {
    message,
    email,
    age,
    isActive,
    emailType: typeof email,
    ageType: typeof age,
    externalValue:
      typeof externalValue === 'string' ? externalValue.toUpperCase() : null,
    arrayOfNums,
    animals,
    student,
    studentWithoutEmail,
    street: person.address?.street ?? 'undefined',
    name,
    number,
    car,
  }

  return <pre>{JSON.stringify(examples, null, 2)}</pre>
}

export default TypesDemo
