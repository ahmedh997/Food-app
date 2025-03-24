import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import noDataImg from '../../../assets/images/blank-user-img.webp';
import { IMAGE_URL } from '../../Services/api/apiConfig';
import Modal from 'react-bootstrap/Modal';


export default function Navbar({ loginData }) {


  // Modal functions 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  console.log(loginData);

  return <>
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
                  src={loginData?.profileImage ? `${IMAGE_URL}/${loginData?.profileImage}` : `${noDataImg}`}
                  alt="Profile Image"
                  className="rounded-circle me-1"
                  style={{ width: '30px', height: '30px' }}
                />
                <span className='me-2'>{loginData?.userEmail}</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" onClick={() => handleShow()}>
                    Profile
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

    {/* Show user  */}

    <Modal show={show} onHide={handleClose} animation={true} className='mt-3'>
      <Modal.Header closeButton className='px-4'>
        <Modal.Title >User Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container d-flex flex-column">
          <div className="user-image d-flex justify-content-center">
            <img style={{ maxWidth: 250, height: 250, objectFit: 'cover' }} loading='lazy' className='img-fluid w-100 rounded-circle my-3' src={loginData?.imagePath ? `${IMAGE_URL}/${loginData?.imagePath}` : `${noDataImg}`} alt="Recipe Image" />
          </div>
          <div className="recipe-data">
            <div className='mb-2 text-capitalize text-center p-3 border-bottom '>
              <h2>{loginData?.userName}</h2>
              <p className='text-white fw-light w-50 m-auto px-3 rounded-pill bg-success shadow-lg'>Role: <span className='fw-medium'>{`${loginData?.userGroup}`}</span> </p>
            </div>
            <div className='text d-flex justify-content-between text-left'>
              <p><span className='fw-bold'>Email: </span> {loginData?.userEmail}</p>
              
            </div>

          </div>

        </div>
      </Modal.Body>
    </Modal>



  </>;
}