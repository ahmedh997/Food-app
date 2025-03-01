import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/Auth-logo.png';

export default function Notfound() {
  return (
    <div className=" h-auto vh-100">
      <div className='bg-notFound'>
        <div className='text-white p-5'>
          <div className="image">
            <img className='w-25 p-2 my-5' src={logo} alt="Food App Logo" />
          </div>
          <div className="text p-4">
            <h2 className='fw-bolder'>Oops.</h2>
            <h3 className='text-success'>Page not found</h3>
            <p>This Page doesn't exist or was removed! <br />
              We suggest you  back to home.</p>
            <button className='btn btn-success w-auto'><Link className='text-decoration-none text-white' to={'/dashboard'} ><i className='fas fa-arrow-left'></i> Back To Home</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}
