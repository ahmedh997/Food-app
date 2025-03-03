import React, { useEffect, useState } from 'react';
import bannerImg from '../../../assets/images/image-banner-all.png';
import Header from '../../Shared/Header/Header';
import { axiosClient, RECIPES_URLS } from '../../Services/urls/urls';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from '../../Shared/NoData/NoData';
import ConfirmDelete from '../../Shared/ConfirmDelete/ConfirmDelete';

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const getRecipesList = async (size, number) => {
    try {
      let list = await axiosClient.get(RECIPES_URLS.getRecipe(size = '10', number = '1'), { headers: { Authorization: localStorage.getItem('token') } });
      console.log(list?.data);
      setRecipesList(list?.data?.data);

    }
    catch (error) {
      console.log(error);

    }

  };

  const deleteRecipeId = async () => {
    try {
      let remove = await axiosClient.delete(RECIPES_URLS.deleteRecipe(selectedRecipeId), { headers: { Authorization: localStorage.getItem('token') } });
      console.log(remove);
      getRecipesList();
      document.getElementById("closeConfirmDelete").click();
    }
    catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    getRecipesList();
  }, []);

  return <>

    <Header title={<h3 className='fw-bolder'>Recipes <span className='fw-lighter'>Items</span> </h3>} description={'You can now add your items that any user can order it from the Application and you can edit'} imageBanner={<img className='bannerImage' src={bannerImg} width={200}></img>} />
    <div className="table-headers d-flex align-items-center justify-content-between m-4 rounded-4">
      <div className="text ">
        <h4>Recipes Table Details</h4>
        <p>You can check all details</p>
      </div>
      <div className="button-add ">
        <button className='btn btn-success px-4 py-2'>Add new Recipe</button>
      </div>
    </div>
    <div className="recipe-container m-3 rounded-4">
      {recipesList?.length > 0 ?

        <table className="table table-striped table-borderless table-light">
          <thead className="rounded-4">
            <tr className="text-center bg-light">
              <th className="p-4" scope="col">#</th>
              <th className="p-4" scope="col">Item Name</th>
              <th className="p-4" scope="col">Image</th>
              <th className="p-4" scope="col">Price</th>
              <th className="p-4" scope="col">Description</th>
              <th className="p-4" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className='table-striped'>
            {recipesList?.map((recipe) => <>
              <tr key={recipe.id} className='text-center'>
                <th scope="row">{recipe.id}</th>
                <td>{recipe.name}</td>
                <td>{recipe.imagePath ? <img width={50} src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt="Recipe Image" /> : <span>No Image!</span>}</td>
                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn border-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <HiDotsHorizontal size={24} />
                    </button>
                    <ul className="dropdown-menu overflow-hidden border-0 rounded-5 shadow-lg w-100">
                      <li>
                        <a role="button" className="dropdown-item d-flex align-items-center">
                          <FiEye aria-label='Eye' className="me-2 text-success" /> View
                        </a>
                      </li>
                      <li>
                        <a role="button" className="dropdown-item d-flex align-items-center">
                          <FiEdit aria-label='Edit' className="me-2 text-success" /> Edit
                        </a>
                      </li>
                      <li onClick={() => setSelectedRecipeId(recipe.id)} data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteModal">
                        <a role="button" className="dropdown-item d-flex align-items-center text-danger">
                          <FiTrash2 aria-label='Trash' className="me-2 text-danger" /> Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </>)
            }

          </tbody>
        </table> : <NoData />}
    </div>


    <button
      id="openConfirmDelete"
      type="button"
      className="d-none"
      data-bs-toggle="modal"
      data-bs-target="#confirmDeleteModal"
    >

    </button>

    <ConfirmDelete deleteAction={deleteRecipeId} />


  </>;

}





