import React from 'react'
import {Link} from 'react-router-dom'
import './notfound.css'
const Notfound = () => {
  return (
    <div className="Notfound-container">
        <h3>Page Not Found</h3>
        <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default Notfound