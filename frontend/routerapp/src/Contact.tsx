import { Link, Outlet } from 'react-router-dom'

export function ContactLondon() {
  return <h4>Contact London</h4>
}

export function ContactParis() {
  return <h4>Contact Paris</h4>
}

function Contact() {
  return (
    <>
      <h3>Contact component</h3>
      <nav aria-label="Contact">
        <Link to="london">London</Link>{' | '}
        <Link to="paris">Paris</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default Contact
