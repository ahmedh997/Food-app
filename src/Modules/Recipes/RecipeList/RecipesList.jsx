import React, { useEffect, useState } from 'react';
import bannerImg from '../../../assets/images/image-banner-all.png';
import Header from '../../Shared/Header/Header';
import { HiDotsHorizontal } from 'react-icons/hi';
import noDataImg from '../../../assets/images/no-img.jpeg';
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from '../../Shared/NoData/NoData';
import ConfirmDelete from '../../Shared/ConfirmDelete/ConfirmDelete';
import { IMAGE_URL, RECIPES_ENDPOINTS } from '../../Services/api/apiConfig';
import { privateApiInstance } from '../../Services/api/apiInstance';
import { toast } from 'react-toastify';
import Pagination from '../../Shared/Pagination/Pagination';

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const getRecipesList = async (pageSize, pageNumber) => {
    try {
      let list = await privateApiInstance.get(RECIPES_ENDPOINTS.GET_RECIPES(),{
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
        }
      });
      console.log(list?.data);
      setRecipesList(list?.data?.data);
      setLoading(false);
      setArrayOfPages(Array(list?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }

  };

  const deleteRecipeId = async () => {
    try {
      let remove = await privateApiInstance.delete(RECIPES_ENDPOINTS.DELETE_RECIPE(selectedRecipeId));
      console.log(remove);
      getRecipesList();
      toast.success('Recipe deleted successfully');
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

    <Header title={<h3 className='fw-bolder'>Recipes <span className='fw-lighter'>Items</span> </h3>} description={'You can now add your items that any user can order it from the Application and you can edit'} imageBanner={<img className='bannerImage' src={bannerImg} width={150}></img>} />
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

      {loading ? <>
        <div className='d-flex align-items-center justify-content-center'>

          <i className='fas fa-spin fa-spinner text-success fs-1'></i>

        </div>
      </>
        : recipesList?.length > 0 ?
          <table className="table table-striped table-borderless table-light">
            <thead className="rounded-4">
              <tr className="text-center bg-light">
                <th className="p-4" scope="col">Item Name</th>
                <th className="p-4" scope="col">Image</th>
                <th className="p-4" scope="col">Price</th>
                <th className="p-4" scope="col">Description</th>
                <th className="p-4" scope="col">Tag</th>
                <th className="p-4" scope="col">Category</th>
                <th className="p-4" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className='table-striped'>
              {recipesList?.map((recipe) => <>
                <tr key={recipe?.id} className='text-center'>
                  <td data-label="Item Name">{recipe?.name}</td>
                  <td data-label="Image"><img style={{ maxWidth: 70, height: 70, objectFit: 'contain' }} loading='lazy' className='img-fluid rounded w-100' src={recipe?.imagePath ? `${IMAGE_URL}/${recipe?.imagePath}` : `${noDataImg}`} alt="User Image" /> </td>
                  <td data-label="Price">{recipe?.price} EGP</td>
                  <td data-label="Description" className='text-wrap'>{recipe?.description}</td>
                  <td data-label="Tag">{recipe?.tag?.name}</td>
                  <td data-label="Category" className={`${recipe?.category[0]?.name ?? 'text-danger'}`}>{recipe?.category[0]?.name ?? 'No Data'}</td>
                  <td data-label="Action">
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
                        <li onClick={() => setSelectedRecipeId(recipe?.id)} data-bs-toggle="modal"
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


    <Pagination getList={getRecipesList} arrayOfPages={arrayOfPages} />

  </>;

}





