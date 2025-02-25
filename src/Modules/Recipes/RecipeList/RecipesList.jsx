import React from 'react';
import bannerImg from '../../../assets/images/image-banner-all.png';
import Header from '../../Shared/Header/Header';

export default function RecipesList() {
  return <>

    <Header title={<h3 className='fw-bolder'>Recipes <span className='fw-lighter'>Items</span> </h3>} description={'You can now add your items that any user can order it from the Application and you can edit'} imageBanner={<img src={bannerImg} width={200}></img>} />

    <div>RecipesList</div>

  </>;

}
