import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../../assets/images/Auth-logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



export default function ForgetPassword() {

  const notify = () => toast(text);

  const navigate = useNavigate();

  let { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    
    try {

      let res = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data);
      toast.success('Code Sent to your email', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });



      navigate('/reset-password');

    }
    catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

      });
    }
  };

  return <>

    <div className="auth-container">

      <div className="container-fluid bg-overlay">

        <div className="row vh-100 justify-content-center align-items-center">

          <div className="col-md-6 bg-white px-5 py-3 rounded-4">

            <div className='card-forgetPass '>


              <div className="logo-container text-center ">

                <img className='w-50 m-3' src={logo} alt="Logo Food App" />
              </div>
              <div className="title">
                <h3 className='h4 fw-bold'>Forgot Your Password?</h3>
                <p className='text-muted'>No worries! Please enter your email and we will send a password reset link</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-input input-group mt-3">
                  <span className="input-group-text p-3" id="basic-addon1">

                    <span className="icon">

                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 3H17.5C18.3284 3 19 3.67157 19 4.5V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V4.5C5 3.67157 5.67157 3 6.5 3Z" stroke="#888" strokeWidth="2" />
                        <path d="M12 17H12.01" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>


                    </span>
                  </span>
                  <input {...register('email', { required: 'Email is required', pattern: { value: /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/, message: 'Please enter Valid Email' } })} type="text" className="form-control" placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1" />
                </div>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                <button className='btn btn-success w-100 mb-3 fs-5 fw-bold py-2 my-5'>Submit</button>
                <ToastContainer />


              </form>

            </div>


          </div>


        </div>



      </div>


    </div>





  </>;
}

