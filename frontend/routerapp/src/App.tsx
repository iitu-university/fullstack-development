import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Contact, { ContactLondon, ContactParis } from './Contact'
import PageNotFound from './PageNotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav aria-label="Main">
        <Link to="/">Home</Link>{' | '}
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />}>
          <Route path="london" element={<ContactLondon />} />
          <Route path="paris" element={<ContactParis />} />
        </Route>
        <Route path="contact/*" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
