import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { privateApiInstance } from '../Services/api/apiInstance';
import { FAVORITES_ENDPOINTS, IMAGE_URL } from '../Services/api/apiConfig';
import noDataImg from '../../assets/images/no image.jpg';
import Header from '../Shared/Header/Header';
import NoData from '../Shared/NoData/NoData';

export default function FavoritesList() {
  const [loginData, setLoginData] = useState(null);
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const removeFromFavorites = async (id) => {
    console.log(id);
    
    try {
      let remove = await privateApiInstance.delete(FAVORITES_ENDPOINTS.DELETE_FAVORITES(id)
    );
      console.log(remove?.data?.data);
      toast.success(remove?.data?.data || "Item Removed Successfully");
      getFavoritesList()
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something Went Wrong');
      setLoading(false);
    }

  };
  const getFavoritesList = async () => {
    try {
      let list = await privateApiInstance.get(FAVORITES_ENDPOINTS.GET_FAVORITES);
      console.log(list?.data?.data);
      setFavList(list?.data?.data);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error getting categories');
      setLoading(false);
    }

  };

  useEffect(() => {
    getFavoritesList();

    const userData = JSON.parse(localStorage.getItem('userData'));
    setLoginData(userData);
    if (userData?.userGroup === 'SuperAdmin') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return <>
    <Header page={"Favorite"} Items={"Items"} />
    <div className="table-headers d-flex align-items-center justify-content-between m-4 rounded-4">
      <div className="text ">
        <h4>Favorite Recipes Details</h4>
        <p>You can check all details</p>
      </div>
    </div>

    {loading ? <>
      <div className='d-flex align-items-center justify-content-center'>

        <i className='fas fa-spin fa-spinner text-success fs-1'></i>

      </div>
    </>
      : favList?.length > 0 ? <>

        <div className="row m-3">
          {favList?.map((item) =>
            <div className="col-md-4 mb-4" key={item?.id}>
              <div className=" text-left rounded-5 position-relative">

                <div className="recipe-body border shadow-sm rounded-4">
                  <i role='button' onClick={()=>removeFromFavorites(item?.id)} aria-label='Heart-broken' className='fas fa-heart-broken position-absolute top-0 end-0 p-2 m-2 bg-danger text-white rounded-5 border border-0'></i>
                  <img style={{ display: 'block', height: 200, width: '100%', objectFit: 'cover' }} loading='lazy' className=' rounded-4 ' src={item?.recipe?.imagePath ? `${IMAGE_URL}/${item?.recipe?.imagePath}` : `${noDataImg}`} alt="Recipe Image" />
                  <div className="d-flex justify-content-between align-items-center p-3 border-bottom rounded-3 shadow-sm">
                    <h2 className="text-capitalize">{item?.recipe?.name}</h2>
                    <p className="text-success">{item?.recipe?.price} EGP</p>
                  </div>

                  <div className="d-flex justify-content-between p-3 bg-light">
                    <p className="text-capitalize"><span className='fw-bold'>Description: </span>{item?.recipe?.description}</p>

                  </div>
                </div>
              </div>

            </div>
          )}
        </div>




      </>
        : <NoData />}






  </>;
}
