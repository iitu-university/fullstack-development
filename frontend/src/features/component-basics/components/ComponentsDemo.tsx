import { Component, Fragment } from 'react'
import './ComponentsDemo.css'

function FunctionGreeting() {
  return <h3>Hello World</h3>
}

class ClassGreeting extends Component {
  render() {
    return <h3>Hello World</h3>
  }
}

function DivGreeting() {
  return (
    <div>
      <h3>Hello World</h3>
      <p>This is my first React component</p>
    </div>
  )
}

function FragmentGreeting() {
  return (
    <Fragment>
      <h3>Hello World</h3>
      <p>This is my first React component</p>
    </Fragment>
  )
}

const StyledGreeting = () => {
  const divStyle = { color: 'red', minHeight: 30 }

  return (
    <>
      <div style={{ minHeight: 20, width: 200 }}>Hello</div>
      <div style={divStyle}>Hello</div>
      <div className="external-style">This is my app</div>
    </>
  )
}

function ComponentsDemo() {
  return (
    <>
      <section className="example">
        <FunctionGreeting />
        <ClassGreeting />
      </section>
      <section className="example">
        <DivGreeting />
        <FragmentGreeting />
        <>
          <h3>Hello World</h3>
          <p>This is my first React component</p>
        </>
      </section>
      <section className="example">
        <StyledGreeting />
      </section>
    </>
  )
}

export default ComponentsDemo
