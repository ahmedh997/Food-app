import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebarr from '../Sidebarr/Sidebarr';




export default function MasterLayout({ loginData }) {

  
  
  
  return <>


    <div className="d-flex">




      <div className='sidebar-icons'>
        <Sidebarr loginData={loginData} />
      </div>
      <div className='w-100'>
        <Navbar loginData={loginData} />
        
        <Outlet loginData={loginData} />
      </div>
      

    </div>




  </>;
}
