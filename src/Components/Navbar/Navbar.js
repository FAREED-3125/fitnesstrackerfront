import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
  <header className="Header-navbar container">
    <Link to='/'><h3>Workout Buddy</h3></Link>
  </header>
  )
}

export default Navbar