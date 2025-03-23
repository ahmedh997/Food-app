import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header/Header';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FiEye, FiTrash2 } from "react-icons/fi";
import NoData from '../Shared/NoData/NoData';
import ConfirmDelete from '../Shared/ConfirmDelete/ConfirmDelete';
import { toast } from 'react-toastify';
import { IMAGE_URL, USERS_ENDPOINTS } from '../Services/api/apiConfig';
import { privateApiInstance } from '../Services/api/apiInstance';
import noDataImg from '../../assets/images/blank-user-img.webp';
import Pagination from '../Shared/Pagination/Pagination';
import Filtration from '../Shared/Filteration/Filtration';
import { useNavigate } from 'react-router-dom';


export default function UsersList() {

  const [loginData, setLoginData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const getUsersList = async (pageSize, pageNumber, name, email, country) => {
    try {
      let users = await privateApiInstance.get(USERS_ENDPOINTS.GET_USERS, {
        params: {
          pageSize,
          pageNumber,
          userName: name,
          email,
          country,
        }
      });
      console.log(users?.data?.data);
      setUsersList(users?.data?.data);
      setLoading(false);
      setArrayOfPages(Array(users?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
    }
    catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }

  };


  const deleteUserById = async () => {
    try {
      let remove = await privateApiInstance.delete(USERS_ENDPOINTS.DELETE_USER(selectedUserId));
      console.log(remove);
      getUsersList();
      toast.success('User deleted successfully');
      document.getElementById("closeConfirmDelete").click();

    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUsersList();
    setLoginData(JSON.parse(localStorage.getItem('userData')));
    if (loginData?.userGroup !== 'SuperAdmin') {
      navigate('/dashboard');
    }
  }, []);

  return <>

    <Header page={"Users"} Items={"List"} />
    <div className="table-headers d-flex align-items-center justify-content-between m-4 rounded-4">
      <div className="text ">
        <h4>Users Table Data</h4>
        <p>You can check all details</p>
      </div>
    </div>

    <Filtration getUsersList={getUsersList} />

    <div className="category-container m-3">
      {loading ? <>
        <div className='d-flex align-items-center justify-content-center'>

          <i className='fas fa-spin fa-spinner text-success fs-1'></i>

        </div>
      </>
        :
        usersList?.length > 0 ?

          <table className="table table-striped table-borderless table-light">
            <thead className='custom-thead'>
              <tr className='text-center'>
                <th className="p-4" scope="col">User Name</th>
                <th className="p-4" scope="col">Image</th>
                <th className="p-4" scope="col">Email</th>
                <th className="p-4" scope="col">Phone Number</th>
                <th className="p-4" scope="col">Country</th>
                <th className="p-4" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((users) => <>
                <tr key={users?.id} className='text-center'>
                  <td data-label="User Name">{users?.userName}</td>
                  <td data-label="User Image" ><img style={{ width: 70, height: 70, objectFit: 'cover' }} loading='lazy' className='img-fluid rounded-circle' src={users?.imagePath ? `${IMAGE_URL}/${users?.imagePath}` : `${noDataImg}`} alt="Recipe Image" /></td>
                  <td data-label="User Email">{users?.email}</td>
                  <td data-label="User Phone">{users?.phoneNumber}</td>
                  <td data-label="User Country">{users?.country}</td>
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
                        <li onClick={() => setSelectedUserId(users?.id)} data-bs-toggle="modal"
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

    <ConfirmDelete deleteAction={deleteUserById} item={'User'} />


    <Pagination getList={getUsersList} arrayOfPages={arrayOfPages} />

  </>;
}
