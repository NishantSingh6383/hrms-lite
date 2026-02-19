import React from 'react'
import { Link } from 'react-router-dom'

function StoredHeader() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' }}>
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          HRMS Lite
        </Link>

        <div className="d-flex">
          <span className="text-white">Admin Panel</span>
        </div>
      </div>
    </nav>
  )
}

export default StoredHeader
