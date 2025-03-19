import React from 'react';
import Header from '../Shared/Header/Header';




export default function Dashboard({ loginData }) {  


  return <>

    <Header userName={loginData?.userName}  />


    <div>Dashboard</div>

  </>;




}
