import { useRef } from 'react'

function RefDemo() {
  const inputRef = useRef(null)

  return (
    <>
      <label>
        Поле для фокуса
        <input ref={inputRef} />
      </label>
      <button onClick={() => inputRef.current.focus()}>Focus input</button>
    </>
  )
}

export default RefDemo
