import React, { useEffect, useState } from 'react';
import bannerImg from '../../../assets/images/image-banner-all.png';
import Header from '../../Shared/Header/Header';
import { axiosClient, CATEGORIES_URLS } from '../../Services/urls/urls';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from '../../Shared/NoData/NoData';
import ConfirmDelete from '../../Shared/ConfirmDelete/ConfirmDelete';
import AddNewCategory from './AddNewCategory';
import { toast } from 'react-toastify';

export default function Categories() {


  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const getCategoriesList = async (size, number) => {
    try {
      let list = await axiosClient.get(CATEGORIES_URLS.getCategories(size = '10', number = '1'), { headers: { Authorization: localStorage.getItem('token') } });
      console.log(list.data);
      setCategoriesList(list?.data?.data);

    }
    catch (error) {
      console.log(error);

    }

  };


  const deleteCategoryId = async () => {
    try {
      let remove = await axiosClient.delete(CATEGORIES_URLS.deleteCategory(selectedCategoryId), { headers: { Authorization: localStorage.getItem('token') } });
      console.log(remove);
      getCategoriesList();
      toast.success('Category deleted successfully');
      document.getElementById("closeConfirmDelete").click();

    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  const addNewCategory = async (data) => {
    try {
      let addNew = await axiosClient.post(CATEGORIES_URLS.addCategory, data, { headers: { Authorization: localStorage.getItem('token') } });
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


  useEffect(() => {
    getCategoriesList();
  }, []);

  return <>

    <Header title={<h3 className='fw-bolder'>Categories <span className='fw-lighter'>Items</span> </h3>} description={'You can now add your items that any user can order it from the Application and you can edit'} imageBanner={<img src={bannerImg} width={200}></img>} />
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

    <div className="recipe-container m-3 rounded-4">
      {categoriesList?.length > 0 ?

        <table className="table table-striped table-borderless">
          <thead>
            <tr className='text-center t-head'>
              <th scope="col">#</th>
              <th scope="col">Item Name</th>
              <th scope="col">Creation date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList?.map((category) => <>
              <tr key={category.id} className='text-center'>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
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
                      <li onClick={() => setSelectedCategoryId(category.id)} data-bs-toggle="modal"
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

  </>;
}
