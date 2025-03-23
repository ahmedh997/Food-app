import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import { HiDotsHorizontal } from 'react-icons/hi';
import noDataImg from '../../../assets/images/no-img.jpeg';
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from '../../Shared/NoData/NoData';
import ConfirmDelete from '../../Shared/ConfirmDelete/ConfirmDelete';
import { CATEGORIES_ENDPOINTS, IMAGE_URL, RECIPES_ENDPOINTS, TAGS_ENDPOINT } from '../../Services/api/apiConfig';
import { privateApiInstance } from '../../Services/api/apiInstance';
import { toast } from 'react-toastify';
import Pagination from '../../Shared/Pagination/Pagination';
import Filtration from '../../Shared/Filteration/Filtration';
import { Link } from 'react-router-dom';

export default function RecipesList() {
  const [loginData, setLoginData] = useState(null);
  const [recipesList, setRecipesList] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // get Categories List
  const getCategoriesList = async () => {
    try {
      let list = await privateApiInstance.get(CATEGORIES_ENDPOINTS.GET_CATEGORIES());
      console.log(list?.data);
      setCategories(list?.data?.data);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      toast.error('Error getting categories');
      setLoading(false);
    }

  };

  // get tags List
  const getTagsList = async () => {
    try {
      let tags = await privateApiInstance.get(TAGS_ENDPOINT.GET_TAGS);
      console.log(tags?.data);
      setTags(tags?.data);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      toast.error('Error getting tags');
      setLoading(false);
    }

  };

  // get Recipes List
  const getRecipesList = async (pageSize, pageNumber, name, tag, category) => {
    try {
      let list = await privateApiInstance.get(RECIPES_ENDPOINTS.GET_RECIPES(), {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: name,
          tagId: tag,
          categoryId: category
        }
      });
      console.log(list?.data);
      setRecipesList(list?.data?.data);
      setLoading(false);
      setArrayOfPages(Array(list?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
    }
    catch (error) {
      console.log(error);
      toast.error('Error getting recipes');
      setLoading(false);
    }

  };
  // delete Recipe Id
  const deleteRecipeId = async () => {
    setIsSubmitting(true);
    try {
      let remove = await privateApiInstance.delete(RECIPES_ENDPOINTS.DELETE_RECIPE(selectedRecipeId));
      console.log(remove);
      getRecipesList();
      setIsSubmitting(false);
      toast.success('Recipe deleted successfully');
      document.getElementById("closeConfirmDelete").click();
    }
    catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast.error('Error deleting recipe');
    }
    finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    getRecipesList();
    getCategoriesList();
    getTagsList();
    setLoginData(JSON.parse(localStorage.getItem('userData')));
  }, []);

  return <>

    <Header page={"Recipes"} Items={"Items"} />
    <div className="table-headers d-flex align-items-center justify-content-between m-4 rounded-4">
      <div className="text ">
        <h4>Recipes Table Details</h4>
        <p>You can check all details</p>
      </div>
      <div className="button-add ">
        {/* <button className='btn btn-success px-4 py-2'>Add new Recipe</button> */}
        <Link to={'/dashboard/recipes/new-recipe'} className='btn btn-success px-4 py-2'>Add new Recipe</Link>
      </div>
    </div>
    <div className="recipe-container m-3 rounded-4">

      <Filtration tags={tags} categories={categories} getRecipesList={getRecipesList} />

      {loading ? <>
        <div className='d-flex align-items-center justify-content-center'>

          <i className='fas fa-spin fa-spinner text-success fs-1'></i>

        </div>
      </>
        : recipesList?.length > 0 ?
          <table className="table table-striped table-borderless table-light">
            <thead className="custom-thead">
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
                  <td data-label="Image"><img style={{ maxWidth: 70, height: 70, objectFit: 'cover' }} loading='lazy' className='img-fluid rounded w-100' src={recipe?.imagePath ? `${IMAGE_URL}/${recipe?.imagePath}` : `${noDataImg}`} alt="Recipe Image" /> </td>
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
                        {loginData?.userGroup == 'SuperAdmin' ? <>

                          <li>
                            <a role="button" className="dropdown-item d-flex align-items-center">
                              <FiEye aria-label='Eye' className="me-2 text-success" /> View
                            </a>
                          </li>
                          <Link className='text-decoration-none' to={`/dashboard/recipes/${recipe?.id}`}>
                            <a role="button" className="dropdown-item d-flex align-items-center">
                              <FiEdit aria-label='Edit' className="me-2 text-success" /> Edit
                            </a>
                          </Link>
                          <li onClick={() => { setSelectedRecipeId(recipe?.id); setIsSubmitting(false); }} data-bs-toggle="modal"
                            data-bs-target="#confirmDeleteModal">
                            <a role="button" className="dropdown-item d-flex align-items-center text-danger">
                              <FiTrash2 aria-label='Trash' className="me-2 text-danger" /> Delete
                            </a>
                          </li>



                        </> : <li>
                          <a role="button" className="dropdown-item d-flex align-items-center">
                            <FiEye aria-label='Eye' className="me-2 text-success" /> View
                          </a>
                        </li>}
                        
                      
                    

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

    <ConfirmDelete deleteAction={deleteRecipeId} item={'Item'} />


    <Pagination getList={getRecipesList} arrayOfPages={arrayOfPages} isSubmitting={isSubmitting} />

  </>;

}





