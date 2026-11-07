import type { FC } from 'react'
import type { HelloProps } from './HelloComponent'

const HelloArrowComponent: FC<HelloProps> = ({ name, age }) => {
  return (
    <p>
      Hello {name}, you are {age} years old!
    </p>
  )
}

export default HelloArrowComponent
