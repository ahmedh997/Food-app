import React from 'react';
import Header from '../Shared/Header/Header';
import { Link } from 'react-router-dom';




export default function Dashboard({ loginData }) {


  return <>

    <Header userName={loginData?.userName} />


    <div>
      <main>
        <header className='bg-addnew rounded-4 m-3 p-5'>
          <row className="d-flex justify-content-between align-items-center">
            <div>
              <h3>Fill the <span className='text-success'>Recipes!</span></h3>
              <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <div className="buttonLink">
              <Link to='/dashboard/recipes/new-recipe' className='btn btn-success px-5'>Fill Recipes  <i className='fas fa-arrow-right'></i></Link>
            </div>
          </row>
        </header>
      </main>
    </div>

  </>;




}
