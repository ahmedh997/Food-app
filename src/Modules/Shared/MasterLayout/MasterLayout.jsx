import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

export default function MasterLayout() {
  return <>


    <div className="d-flex">

      <div className='bg-danger w-25'>
        <Sidebar />
      </div>
      <div className='bg-info w-75'>
        <Navbar />
        <Header />
        <Outlet />
      </div>
      

    </div>




  </>;
}
