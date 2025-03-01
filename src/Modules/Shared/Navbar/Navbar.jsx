import React from 'react';
import { FaBell } from 'react-icons/fa';
import profileImage from "../../../assets/images/profil-image.png"

export default function Navbar({ loginData }) {

  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary m-3 rounded-4">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={profileImage}
                  alt="Profile Image"
                  className="rounded-circle me-1"
                  style={{ width: '30px', height: '30px' }}
                />
                <span className='me-2'>{loginData?.userName}</span>
              </a>
              
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <FaBell aria-label='Notification bell' className="text-muted" size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}