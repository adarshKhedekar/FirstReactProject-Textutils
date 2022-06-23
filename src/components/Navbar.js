import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'


export default function Navbar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.Navmode} bg-${props.Navmode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">{props.aboutText}</Link>
        </li>
      </ul>
      <htmlForm className="d-flex" role="search">
        <input className="htmlForm-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </htmlForm>
    </div>
  </div>
</nav>
    </div>
  )
}

Navbar.propTypes  = {
    title: Proptypes.string.isRequired,
    aboutText: Proptypes.string.isRequired
}

Navbar.defaultProps  = {
    title: 'Adarsh',
    aboutText: 'About'
}
