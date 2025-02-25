import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SideBar from '../Sidebar/Sidebar';


export default function MasterLayout({ loginData }) {

  
  
  
  return <>


    <div className="d-flex">




      <div className='sidebar-icons'>
        <SideBar />
      </div>
      <div className='w-100'>
        <Navbar loginData={loginData} />
        
        <Outlet loginData={loginData} />
      </div>
      

    </div>




  </>;
}
