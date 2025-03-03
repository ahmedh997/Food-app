import React from 'react';

export default function Header({ title, description, imageBanner }) {
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
