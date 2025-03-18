import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Filtration({ tags, categories, getRecipesList, getCategoriesList, getUsersList }) {


    const location = useLocation();

    const [name, setName] = useState('');

    const [tagValue, setTagValue] = useState('');

    const [catValue, setCatValue] = useState('');

    const [emailValue, setEmailValue] = useState('');

    const [countryValue, setCountryValue] = useState('');

    const getNameValue = (e) => {
        setName(e.target.value);
        if (location.pathname.includes('/recipes')) {
            getRecipesList(5, 1, e.target.value, tagValue, catValue);
        } else if (location.pathname.includes('/categories')) {
            getCategoriesList(5, 1, e.target.value);
        }
        else if (location.pathname.includes('/users')) {
            getUsersList(5, 1, e.target.value, emailValue, countryValue);
        }
    };


    const getTagValue = (e) => {
        setTagValue(e.target.value);
        getRecipesList(5, 1, name, e.target.value, catValue);
    };


    const getCatValue = (e) => {
        setCatValue(e.target.value);
        getRecipesList(5, 1, name, tagValue, e.target.value);
    };

    const getEmailValue = (e) => {
        setEmailValue(e.target.value);
        getUsersList(5, 1, name, e.target.value, countryValue );
    };

    const getCountryValue = (e) => {
        setCountryValue(e.target.value);
        getUsersList(5, 1, name, emailValue, e.target.value);
    };

    return <>

        <nav className="container-fluid px-4">

            <div className={`row align-items-center ${location.pathname.includes('/users') ? 'justify-content-center gap-5' : 'justify-content-between'}`}>

                {/* search input  */}
                <div className={`btn-group rounded border border-1 mb-4 ${location.pathname.includes('/users') ? 'col-md-3' : 'col-md-6'}`} role="search" >
                    <span className='input-group-text bg-transparent border-0' id='search-addon'><i className='fas fa-search'></i></span>
                    <input onChange={getNameValue} className="form-control bg-white border-0 " type="search" placeholder="Search By Name" aria-label="Search" aria-describedby='search-addon' />
                </div>
                <div className={`btn-group rounded border border-1 mb-4 ${location.pathname.includes('/users') ? 'col-md-3' : 'd-none'}`} role="search" >
                    <span className='input-group-text bg-transparent border-0' id='search-addon'><i className='fas fa-envelope'></i></span>
                    <input onChange={getEmailValue} className="form-control bg-white border-0 " type="search" placeholder="Search By Email" aria-label="Search" aria-describedby='search-addon' />
                </div>
                <div className={`btn-group rounded border border-1 mb-4 ${location.pathname.includes('/users') ? 'col-md-3' : 'd-none'}`} role="search" >
                    <span className='input-group-text bg-transparent border-0' id='search-addon'><i className='fas fa-globe'></i></span>
                    <input onChange={getCountryValue} className="form-control bg-white border-0 " type="search" placeholder="Search By Country" aria-label="Search" aria-describedby='search-addon' />
                </div>

                {/* select tag */}
                <div className={`col-md-3 select-tag mb-4 ${location.pathname.includes('/categories') || location.pathname.includes('/users') ? 'd-none' : 'd-flex'}`}>
                    <select onChange={getTagValue} className="form-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <option value="">Tags</option>
                        {tags?.map(({ id, name }) => (
                            <option value={id} key={id}>{name}</option>
                        ))}

                    </select>
                </div>

                {/* select category */}
                <div className={`col-md-3 select-tag mb-4 ${location.pathname.includes('/categories') || location.pathname.includes('/users') ? 'd-none' :'d-flex'}`}>
                    <select onChange={getCatValue} className="form-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <option value="">Categories</option>
                        {categories?.map(({ id, name }) => (
                            <option value={id} key={id}>{name}</option>
                        ))}
                    </select>
                </div>

            </div>
        </nav>



    </>;
}
