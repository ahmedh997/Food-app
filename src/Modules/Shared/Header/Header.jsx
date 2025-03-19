import React from 'react';
import { useLocation } from 'react-router-dom';
import banner from '../../../assets/images/image-dashboard.png';
import bannerImg from '../../../assets/images/image-banner-all.png';

export default function Header({ page, Items, userName }) {

  const location = useLocation();
  const bannerBG = location.pathname === '/dashboard' ? banner : bannerImg;
  const bannerWidth = location.pathname === '/dashboard'  ? 300 : 150;
  const imageBanner = <img src={bannerBG} width={bannerWidth}></img>;
  const title = location.pathname === '/dashboard' ? <h3 className='fw-bolder'>Welcome  <span className='fw-lighter'>{userName}</span> </h3> : <h3 className='fw-bolder'>{page} <span className='fw-lighter'>{Items}</span> </h3>;
  const description = location.pathname === '/dashboard' ? 'This is a welcoming screen for the entry of the application , you can now see the options' : 'You can now add your items that any user can order it from the Application and you can edit';


  return <>

    <div className="header-container rounded-4 p-2 m-3 text-white">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between ">
          <div className="caption">
            <div className='h3'>{title}</div>
            <p>{description}</p>
          </div>
          <div className="image-section">
            {imageBanner}
          </div>
        </div>
      </div>
    </div>


  </>;
}
