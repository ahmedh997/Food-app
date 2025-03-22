import React, { use, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../../../assets/images/logo-sidebar.png';
import { FiHome, FiUsers, FiGrid, FiCalendar, FiLock, FiLogOut , FiHeart } from "react-icons/fi";
import { toast } from 'react-toastify';
import ChangePassword from '../../Authentecation/ChangePassword/ChangePassword';

export default function SideBar({ loginData }) {


  const location = useLocation();

  const navigate = useNavigate();
  const [isCollapsed, setIsCollapced] = useState(localStorage.getItem('sidebarCollapsed') === 'true');
  const [active, setActive] = useState(localStorage.getItem('isActiveMenu') || '');


  const handleMenuItemClick = (menuItem) => {
    setActive(menuItem);
  };

  let toggleSidebar = () => {
    setIsCollapced(!isCollapsed);
    localStorage.setItem('sidebarCollapsed', !isCollapsed);
  };


  let logOut = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    const path = location.pathname;
    let title = 'Food App';

    if (path.includes('/dashboard')) title = "Dashboard | Food App";
    if (path.includes('/recipes')) title = "Recipes | Food App";
    if (path.includes('/categories')) title = "Categories | Food App";
    if (path.includes('/users')) title = "Users | Food App";
    if (path.includes('/favorites')) title = "Favorites | Food App";


    let activeItem = '';

    if (location.pathname.includes('/dashboard')) activeItem = 'home';
    if (location.pathname.includes('/categories')) activeItem = 'categories';
    if (location.pathname.includes('/recipes')) activeItem = 'recipes';
    if (location.pathname.includes('/users')) activeItem = 'users';
    if (location.pathname.includes('/favorites')) activeItem = 'favorites';

    setActive(activeItem);
    localStorage.setItem('isActiveMenu', activeItem);

    document.title = title;

  }, [location.pathname]);





  return <>


    <div className="sidebar-container">

      <Sidebar collapsed={isCollapsed}>
        <Menu className='text-white'>

          <MenuItem className='text-white sidebar-logo' onClick={toggleSidebar} icon={<img width={100} src={logo} />} >  </MenuItem>
          <MenuItem className={`text white ${active === 'home' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('home'); }} icon={<FiHome aria-label='Home' className="text-white text-2xl" />} component={<Link to='/dashboard' />}> Home </MenuItem>
          {loginData?.userGroup == 'SuperAdmin' ? <MenuItem className={`text white ${active === 'users' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('users'); }} icon={<FiUsers aria-label='Users' className="text-white text-2xl" />} component={<Link to='/dashboard/users' />}> Users </MenuItem> : ''}  
          <MenuItem className={`text white ${active === 'recipes' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('recipes'); }} icon={<FiGrid aria-label='Grid' className="text-white text-2xl" />} component={<Link to='/dashboard/recipes' />}>Recipes  </MenuItem>
          {loginData?.userGroup == 'SystemUser' ? <MenuItem className={`text white ${active === 'favorites' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('favorites'); }} icon={<FiHeart aria-label='Grid' className="text-white text-2xl" />} component={<Link to='/dashboard/favorites' />}>Favorites  </MenuItem> : ''}   
          {loginData?.userGroup == 'SuperAdmin' ? <MenuItem className={`text white ${active === 'categories' ? 'active' : ''}`} onClick={() => { handleMenuItemClick('categories'); }} icon={<FiCalendar aria-label='Calender' className="text-white text-2xl" />} component={<Link to='/dashboard/categories' />}> Categories </MenuItem> : ''}
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
