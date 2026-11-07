function FunctionsDemo() {
  function sayHello(name: string): void {
    console.log(`Hello ${name}`)
  }

  function checkId(id: string | number): string {
    if (typeof id === 'string') {
      return id.toUpperCase()
    }

    return id.toString()
  }

  function calcSum(x: number, y: number): number {
    return x + y
  }

  const arrowSum = (x: number, y: number): number => x + y

  return (
    <>
      <p>{calcSum(2, 3)}</p>
      <p>{arrowSum(4, 5)}</p>
      <p>{checkId('abc')}</p>
      <p>{checkId(12)}</p>
      <button onClick={() => sayHello('Mary')}>Say hello</button>
    </>
  )
}

export default FunctionsDemo
