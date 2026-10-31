import { useState } from 'react'

function SingleFieldForm() {
  const [text, setText] = useState('')
  const [inline, setInline] = useState(false)

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`You typed: ${text}`)
  }

  return (
    <section className="example" aria-label="Одно поле">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={inline}
          onChange={(event) => setInline(event.target.checked)}
        />
        Inline-обработчик onChange
      </label>
      <form onSubmit={handleSubmit}>
        <label>
          Текст
          <input
            type="text"
            value={text}
            onChange={
              inline ? (event) => setText(event.target.value) : handleChange
            }
          />
        </label>
        <input type="submit" value="Press me" />
      </form>
    </section>
  )
}

export default SingleFieldForm
