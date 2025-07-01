import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to="/" style={{ fontFamily: 'Arial, sans-serif' }}>
            Full Stack CRUD Application
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn btn-light text fw-bold" to="/adduser">
                  <i className="fas fa-user-plus"></i> Add User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
