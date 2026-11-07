function EventsDemo() {
  const handleClick = () => {
    alert('Button pressed')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    alert('Form submit')
  }

  return (
    <>
      <button onClick={handleClick}>Press Me</button>
      <form onSubmit={handleSubmit} className="example">
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default EventsDemo
