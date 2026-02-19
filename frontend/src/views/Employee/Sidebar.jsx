import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation()
    const isActiveLink = (currentPath, linkPath) =>{
        return currentPath.includes(linkPath)
    }



  return (
<div className="col-md-3 col-lg-2 sidebar-offcanvas bg-dark navbar-dark" id="sidebar" role="navigation"  style={{height:'700px'}}>
    <ul className="nav nav-pills flex-column mb-auto nav flex-column pl-1 pt-2">
        <li className="mb-3">
            <Link to="/dashboard" className={isActiveLink(location.pathname,'dashboard') ? "nav-link text-white active":"nav-link text-white "}>
                <i className="bi bi-speedometer" /> Dashboard{" "}
            </Link>
        </li>
        <li className="mb-3">
            <Link to="/employees/" className={isActiveLink(location.pathname,'/employees/') ? "nav-link text-white active":"nav-link text-white "}>
                <i className="bi bi-grid" /> Employees{" "}
            </Link>
        </li>
        <li className="mb-3">
            <Link to="/employee/add" className={isActiveLink(location.pathname,'/add') ? "nav-link text-white active":"nav-link text-white "}>
                <i className="bi bi-grid" /> Add Employees{" "}
            </Link>
        </li>
        <li className="mb-3">
            <Link to="/attendance" className={isActiveLink(location.pathname,'/attendance') ? "nav-link text-white active":"nav-link text-white "}>
                <i className="bi bi-cart-check" /> Attendance{" "}
            </Link>
        </li>
             
    </ul>
    <hr />
</div>
  )
}

export default Sidebar