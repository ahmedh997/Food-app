import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../../../assets/images/logo-sidebar.png';
import { FiHome, FiUsers, FiGrid, FiCalendar, FiLock, FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';
import ChangePassword from '../../Authentecation/ChangePassword/ChangePassword';

export default function SideBar() {


  const navigate = useNavigate();
  const [isCollapsed, setIsCollapced] = useState(true);
  const [active, setActive] = useState('');


  const handleMenuItemClick = (menuItem) => {
    setActive(menuItem);
  };

  let toggleSidebar = () => {
    setIsCollapced(!isCollapsed);
  };


  let logOut = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };


  return <>


    <div className="sidebar-container">

      <Sidebar collapsed={isCollapsed}>
        <Menu className='text-white'>

          <MenuItem className='text-white sidebar-logo' onClick={toggleSidebar} icon={<img width={100} src={logo} />} >  </MenuItem>
          <MenuItem className={`text white ${active === 'home' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('home'); }} icon={<FiHome aria-label='Home' className="text-white text-2xl" />} component={<Link to='/dashboard' />}> Home </MenuItem>
          <MenuItem className={`text white ${active === 'users' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('users'); }} icon={<FiUsers aria-label='Users' className="text-white text-2xl" />} component={<Link to='/dashboard/users' />}> Users </MenuItem>
          <MenuItem className={`text white ${active === 'recipes' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('recipes'); }} icon={<FiGrid aria-label='Grid' className="text-white text-2xl" />} component={<Link to='/dashboard/recipes' />}>Recipes  </MenuItem>
          <MenuItem className={`text white ${active === 'categories' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('categories'); }} icon={<FiCalendar aria-label='Calender' className="text-white text-2xl" />} component={<Link to='/dashboard/categories' />}> Categories </MenuItem>
          <MenuItem
            icon={<FiLock aria-label='lock' className="text-white text-2xl" />}
            onClick={() => { document.getElementById("openChangePassword").click(); handleMenuItemClick('changePass'); }}
            className={`text white ${active === 'changePass' ? 'active' : ''}`}
          >
            Change Password
          </MenuItem>
          <MenuItem className='text-white log-out-btn' onClick={logOut} icon={<FiLogOut className="text-white text-2xl" />}> Logout </MenuItem>
        </Menu>
      </Sidebar>

    </div >

    <button
      id="openChangePassword"
      type="button"
      className="d-none"
      data-bs-toggle="modal"
      data-bs-target="#changePasswordModal"
    >
    </button>


    <ChangePassword />




  </>;



}
