import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../../../assets/images/logo-sidebar.png';
import { FiHome, FiUsers, FiGrid, FiCalendar, FiLock, FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';

export default function SideBar() {


  const [isCollapsed, setIsCollapced] = useState(true);

  let toggleSidebar = () => {
    setIsCollapced(!isCollapsed);
  };


  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };


  return <>


    <div className="sidebar-container">

      <Sidebar collapsed={isCollapsed}>
        <Menu>

          <MenuItem className='text-white sidebar-logo' onClick={toggleSidebar} icon={<img width={100} src={logo} />} >  </MenuItem>
          <MenuItem className='text-white' icon={<FiHome className="text-white text-2xl" />} component={<Link to='/dashboard' />}> Home </MenuItem>
          <MenuItem className='text-white' icon={<FiUsers className="text-white text-2xl" />} component={<Link to='/dashboard/users' />}> Users </MenuItem>
          <MenuItem className='text-white' icon={<FiGrid className="text-white text-2xl" />} component={<Link to='/dashboard/recipes' />}>Recipes  </MenuItem>
          <MenuItem className='text-white' icon={<FiCalendar className="text-white text-2xl" />} component={<Link to='/dashboard/categories' />}> Categories </MenuItem>
          <MenuItem className='text-white' icon={<FiLock className="text-white text-2xl" />} component={<Link to='/dashboard/change-password' />}> Change Password </MenuItem>
          <MenuItem className='text-white log-out-btn' onClick={logOut} icon={<FiLogOut className="text-white text-2xl" />}> Logout </MenuItem>
        </Menu>
      </Sidebar>

    </div>





  </>;



}
