import React, { useState } from 'react';

export default function Filtration({ tags, categories, getRecipesList, getCategoriesList }) {

    const [name, setName] = useState('');

    const [tagValue, setTagValue] = useState('');

    const [catValue, setCatValue] = useState('');

    const getNameValue = (e) => {
        setName(e.target.value);
        if ()

        getRecipesList(5, 1, e.target.value, tagValue, catValue);
        getCategoriesList(5,1,e.target.value)
    };
    const getTagValue = (e) => {
        setTagValue(e.target.value);
        getRecipesList(5, 1, name, e.target.value, catValue);
    };
    const getCatValue = (e) => {
        setCatValue(e.target.value);
        getRecipesList(5, 1, name, tagValue, e.target.value);
    };

    return <>

        <nav className="container-fluid px-4">

            <div className="row justify-content-between align-items-center">

                {/* search input  */}
                <div className="col-md-6 btn-group rounded border border-1 mb-4" role="search">
                    <span className='input-group-text bg-transparent border-0' id='search-addon'><i className='fas fa-search'></i></span>
                    <input onChange={getNameValue} className="form-control bg-white border-0 " type="search" placeholder="Search" aria-label="Search" aria-describedby='search-addon' />
                </div>

                {/* select tag */}
                <div className="col-md-3 select-tag mb-4">
                    <select onChange={getTagValue} className="form-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <option value="">Tags</option>
                        {tags?.map(({ id, name }) => (
                            <option value={id} key={id}>{name}</option>
                        ))}

                    </select>
                </div>
                {/* select category */}
                <div className="col-md-3 select-cat mb-4">
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
