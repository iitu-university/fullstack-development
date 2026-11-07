import { useEffect, useState } from 'react'

function EveryRender() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  useEffect(() => {
    console.log('Hello from useEffect: every render')
  })

  return (
    <>
      <p>
        Counter = {count}; другое состояние = {other}
      </p>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>{' '}
      <button onClick={() => setOther((previous) => previous + 1)}>
        Другой рендер
      </button>
    </>
  )
}

function CountDependency() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  useEffect(() => {
    console.log(`Counter value is now ${count}`)
  }, [count])

  return (
    <>
      <p>
        Counter = {count}; другое состояние = {other}
      </p>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>{' '}
      <button onClick={() => setOther((previous) => previous + 1)}>
        Другой рендер
      </button>
    </>
  )
}

function MountOnly() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Hello from useEffect: mount')
  }, [])

  return (
    <>
      <p>Counter = {count}</p>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>
    </>
  )
}

function WithCleanup() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`Hello from useEffect: setup ${count}`)

    return () => {
      console.log(`Clean up function: ${count}`)
    }
  }, [count])

  return (
    <>
      <p>Counter = {count}</p>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>
    </>
  )
}

const variants = [
  { title: 'После каждого рендера', component: EveryRender },
  { title: 'Зависимость [count]', component: CountDependency },
  { title: 'Пустой массив []', component: MountOnly },
  { title: 'Зависимость и cleanup', component: WithCleanup },
]

function EffectsDemo() {
  const [variant, setVariant] = useState(0)
  const [isMounted, setIsMounted] = useState(true)
  const Example = variants[variant].component

  return (
    <>
      <label>
        Вариант эффекта
        <select
          value={variant}
          onChange={(event) => setVariant(Number(event.target.value))}
        >
          {variants.map(({ title }, index) => (
            <option key={title} value={index}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => setIsMounted((previous) => !previous)}>
        {isMounted ? 'Размонтировать пример' : 'Смонтировать пример'}
      </button>
      <section className="example">
        {isMounted && <Example key={variant} />}
      </section>
    </>
  )
}

export default EffectsDemo
