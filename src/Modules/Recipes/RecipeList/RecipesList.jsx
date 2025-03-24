import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import { HiDotsHorizontal } from 'react-icons/hi';
import noDataImg from '../../../assets/images/no image.jpg';
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from '../../Shared/NoData/NoData';
import ConfirmDelete from '../../Shared/ConfirmDelete/ConfirmDelete';
import { CATEGORIES_ENDPOINTS, FAVORITES_ENDPOINTS, IMAGE_URL, RECIPES_ENDPOINTS, TAGS_ENDPOINT } from '../../Services/api/apiConfig';
import { privateApiInstance } from '../../Services/api/apiInstance';
import { toast } from 'react-toastify';
import Pagination from '../../Shared/Pagination/Pagination';
import Filtration from '../../Shared/Filteration/Filtration';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function RecipesList() {
  const [loginData, setLoginData] = useState(null);
  const [recipesList, setRecipesList] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);



  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Modal functions 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setLoading(false);
      toast.success('Recipe deleted successfully');
      document.getElementById("closeConfirmDelete").click();
    }
    catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setLoading(false);
      toast.error('Error deleting recipe');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const addToFav = async (selectedRecipeId) => {
    
    try {
      let list = await privateApiInstance.post(FAVORITES_ENDPOINTS.ADD_FAVORITES, { 'recipeId': selectedRecipeId });
      console.log(list?.data);
      toast.success('Item Added to your Favorites List');
      setLoading(false);
      handleClose()

    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error getting Favorites');
      setLoading(false);
    }

  };




  useEffect(() => {
    getRecipesList();
    getCategoriesList();
    getTagsList();

    const userData = JSON.parse(localStorage.getItem('userData'));
    setLoginData(userData);
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
        {loginData?.userGroup === 'SystemUser' ? '' : <Link to={'/dashboard/recipes/new-recipe'} className='btn btn-success px-4 py-2'>Add new Recipe</Link>}
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
                      <ul className="dropdown-menu overflow-hidden border-0 rounded-5 shadow-sm w-100">
                        {loginData?.userGroup == 'SuperAdmin' ? <>

                          <li>
                            <a role="button" className="dropdown-item d-flex align-items-center" onClick={() => { setSelectedRecipe(recipe); handleShow(); }} >
                              <FiEye aria-label='Eye' className="me-2 icon-dropdown" /> View
                            </a>
                          </li>

                          <Link className='text-decoration-none' to={`/dashboard/recipes/${recipe?.id}`}>
                            <a role="button" className="dropdown-item d-flex align-items-center">
                              <FiEdit aria-label='Edit' className="me-2 icon-dropdown" /> Edit
                            </a>
                          </Link>
                          <li onClick={() => { setSelectedRecipeId(recipe?.id); setIsSubmitting(false); }} data-bs-toggle="modal"
                            data-bs-target="#confirmDeleteModal">
                            <a role="button" className="dropdown-item d-flex align-items-center text-danger">
                              <FiTrash2 aria-label='Trash' className="me-2 icon-dropdown" /> Delete
                            </a>
                          </li>



                        </> : <li>
                          <a role="button" className="dropdown-item d-flex align-items-center" onClick={() => { setSelectedRecipe(recipe); handleShow() }} >
                            <FiEye aria-label='Eye' className="me-2 icon-dropdown" /> View
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

    {/* Add to favorite modal  */}


    <Modal show={show} onHide={handleClose} animation={true} className='mt-3'>
      <Modal.Header closeButton>
        <Modal.Title className='p-2'>Recipe details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container d-flex flex-column">
          <div className="recipe-image d-flex justify-content-center position-relative">
            <p className='text-white fw-bold position-absolute end-0 px-3 py-1 mx-5 my-4 rounded-pill bg-success shadow-lg'>{`${selectedRecipe?.price} EGP `} </p>
            <img style={{ maxWidth: 250, height: 250, objectFit: 'cover' }} loading='lazy' className='img-fluid w-100 rounded-4 my-3' src={selectedRecipe?.imagePath ? `${IMAGE_URL}/${selectedRecipe?.imagePath}` : `${noDataImg}`} alt="Recipe Image" />
          </div>
          <div className="recipe-data">
            <h3 className='mb-2 text-capitalize text-center p-3 border-bottom '>
              {selectedRecipe?.name}
            </h3>
            <div className='text d-flex justify-content-between'>
              <p><span className='fw-bold'>Description: </span> {selectedRecipe?.description}</p>
            </div>
            <div className='text '>
              <p><span className='fw-bold'>Tag: </span> {selectedRecipe?.tag?.name}</p>
              <p className=''><span className='fw-bold'>Category: </span>{selectedRecipe?.category?.[0].name}</p>
            </div>
          </div>

        </div>
      </Modal.Body>
      {loginData?.userGroup === 'SuperAdmin' ?  <>
      
      </> :  <Modal.Footer>
        <Button disabled={loading} variant="outline-dark" onClick={() => { addToFav(selectedRecipe?.id); }}>
          {loading ? <i className='fas fa-spin fa-spinner'></i> : 'Add To Favorites'}
        </Button>
      </Modal.Footer>}
    </Modal>





    <button
      id="openConfirmDelete"
      type="button"
      className="d-none"
      data-bs-toggle="modal"
      data-bs-target="#confirmDeleteModal"
    >

    </button>

    <ConfirmDelete deleteAction={deleteRecipeId} item={'Item'} loading={loading} />


    <Pagination getList={getRecipesList} arrayOfPages={arrayOfPages} isSubmitting={isSubmitting} />

  </>;

}





