import React, { useEffect, useState } from 'react';
import bannerImg from '../../../assets/images/image-banner-all.png';
import Header from '../../Shared/Header/Header';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from '../../Shared/NoData/NoData';
import ConfirmDelete from '../../Shared/ConfirmDelete/ConfirmDelete';
import AddNewCategory from './AddNewCategory';
import { toast } from 'react-toastify';
import { privateApiInstance } from '../../Services/api/apiInstance';
import { CATEGORIES_ENDPOINTS } from '../../Services/api/apiConfig';
import UpdateCategory from './UpdateCategory';
import Pagination from '../../Shared/Pagination/Pagination';
import Filtration from '../../Shared/Filteration/Filtration';

export default function Categories() {


  const [categoriesList, setCategoriesList] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [arrayOfPages, setArrayOfPages] = useState([]);


  // get Categories List
  const getCategoriesList = async (pageSize, pageNumber, name) => {
    try {
      let list = await privateApiInstance.get(CATEGORIES_ENDPOINTS.GET_CATEGORIES(),{
        params: {
        pageSize: pageSize,
        pageNumber: pageNumber,
        name: name
      }});
      console.log(list?.data);
      setCategoriesList(list?.data?.data);
      setLoading(false);
      setArrayOfPages(Array(list?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }

  };

  // delete Category Id
  const deleteCategoryId = async () => {
    try {
      let remove = await privateApiInstance.delete(CATEGORIES_ENDPOINTS.DELETE_CATEGORY(selectedCategoryId));
      console.log(remove);
      getCategoriesList();
      toast.success('Category deleted successfully');
      document.getElementById("closeConfirmDelete").click();

    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  // add New Category
  const addNewCategory = async (data) => {
    try {
      let addNew = await privateApiInstance.post(CATEGORIES_ENDPOINTS.ADD_CATEGORY, data);
      console.log(addNew);
      getCategoriesList();
      toast.success('Category added successfully');
      document.getElementById("closeAddCategory").click();
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // edit Category 
  const editCategory = async (data) => {
    try {

      let updateCategory = await privateApiInstance.put(CATEGORIES_ENDPOINTS.UPDATE_CATEGORY(selectedCategoryId), data);
      console.log(updateCategory);
      getCategoriesList();
      toast.success('Category updated successfully');
      document.getElementById("closeEditCategory").click();
    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }

  };


  useEffect(() => {
    getCategoriesList();
  }, []);

  return <>

    <Header title={<h3 className='fw-bolder'>Categories <span className='fw-lighter'>Items</span> </h3>} description={'You can now add your items that any user can order it from the Application and you can edit'} imageBanner={<img src={bannerImg} width={150}></img>} />
    <div className="table-headers d-flex align-items-center justify-content-between m-4 rounded-4">
      <div className="text ">
        <h4>Categories Table Details</h4>
        <p>You can check all details</p>
      </div>
      <div className="button-add ">
        <button data-bs-toggle="modal"
          data-bs-target="#addNewCategory" className='btn btn-success px-4 py-2'>Add new Category</button>
      </div>
    </div>

    <Filtration getCategoriesList={getCategoriesList}  />

    <div className="category-container m-3">
      {loading ? <>
        <div className='d-flex align-items-center justify-content-center'>

          <i className='fas fa-spin fa-spinner text-success fs-1'></i>

        </div>
      </> : categoriesList?.length > 0 ?

        <table className="table table-striped table-borderless table-light">
          <thead>
            <tr className='text-center'>
              <th className="p-4" scope="col">ID</th>
              <th className="p-4" scope="col">Item Name</th>
              <th className="p-4" scope="col">Creation date</th>
              <th className="p-4" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList?.map((category) => <>
              <tr key={category?.id} className='text-center'>
                <td data-label="ID">{category?.id}</td>
                <td data-label="Name">{category?.name}</td>
                <td data-label="Creation Date">{category?.creationDate}</td>
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
                      <li data-bs-toggle="modal" data-bs-target="#editCategory" onClick={() => setSelectedCategoryId(category?.id)}>
                        <a role="button" className="dropdown-item d-flex align-items-center" >
                          <FiEdit aria-label='Edit' className="me-2 text-success" /> Edit
                        </a>
                      </li>
                      <li onClick={() => setSelectedCategoryId(category?.id)} data-bs-toggle="modal"
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
      type="button"
      className="d-none"
      data-bs-toggle="modal"
      data-bs-target="#confirmDeleteModal"
    >

    </button>

    <ConfirmDelete deleteAction={deleteCategoryId} />


    <button
      type="button"
      className="d-none"
      data-bs-toggle="modal"
      data-bs-target="#addNewCategory"
    >

    </button>

    <AddNewCategory addNewCategory={addNewCategory} />

    <button
      type="button"
      className="d-none"
      data-bs-toggle="modal"
      data-bs-target="#editCategory"
    >

    </button>

    <UpdateCategory editCategory={editCategory} />

    <Pagination getList={getCategoriesList} arrayOfPages={arrayOfPages} />       

  </>;
}
