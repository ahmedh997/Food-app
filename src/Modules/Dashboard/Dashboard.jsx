import React from 'react';
import Header from '../Shared/Header/Header';
import banner from '../../../src/assets/images/image-dashboard.png';


export default function Dashboard() {
  return <>



    <Header title={<h3 className='fw-bolder'>Welcome to <span className='fw-lighter'>Food App!</span> </h3>} description={'This is a welcoming screen for the entry of the application , you can now see the options'} imageBanner={<img src={banner} width={300}></img>} />


    <div>Dashboard</div>

  </>;




}
