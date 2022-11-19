import React from 'react'
import { Outlet, Link, json } from 'react-router-dom'

const Nav = () => {
  const payload = JSON.parse(sessionStorage.getItem('paylode'));
  const { name, email, role, username } = payload;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">{role == "1" ? "Admin" : "Field Offier"}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/benificarylists">Benificary lists</Link>
            </li>
            {role == "1" ?
              <li className="nav-item">
                <Link className="nav-link" to="/fieldofficer">Fied Officers<span className="sr-only"></span></Link>
              </li>
              : <></>}

            {role == "1" ?
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Master Table
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/state">State</Link>
                  <Link className="dropdown-item" to="/district">District</Link>
                  <Link className="dropdown-item" to="/blocks">Block</Link>
                  <Link className="dropdown-item" to="/village">Village</Link>

                </div>
              </li> : <></>}



          </ul>
        </div>

        <div>
          <p className='mx-2'>{name}</p>
        </div>

      </nav>
    </>
  )
}

export default Nav
