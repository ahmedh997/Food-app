import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../../assets/images/Auth-logo.png';


export default function AuthLayout() {
  return (

    <div className="auth-container">

      <div className="container-fluid bg-overlay">

        <div className="row min-vh-100 justify-content-center align-items-center">

          <div className="col-md-6 bg-white px-5 py-3 rounded-4">

            <div className='card-details'>
              <div className="logo-container text-center ">
                <img className='w-50 m-3' src={logo} alt="Logo Food App" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}
