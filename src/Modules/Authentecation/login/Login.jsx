import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../../assets/images/Auth-logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



export default function Login() {


  const [ShowPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => setShowPassword(!ShowPassword);


  const notify = () => toast(text);

  const navigate = useNavigate();

  let { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      let res = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login", data);

      toast.success('Logged in successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });



      navigate('/dashboard');

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

            <div className='card-login '>


              <div className="logo-container text-center ">

                <img className='w-50 m-3' src={logo} alt="Logo Food App" />
              </div>
              <div className="title">
                <h3 className='h4 fw-bold'>Log In</h3>
                <p className='text-muted'>Welcome Back! Please enter your details</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-input input-group mb-2 mt-4">
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
                <div className="input-group mb-2 mt-4 d-flex align-items-center justify-content-between">
                  <span className="input-group-text p-3" id="basic-addon1">

                    <span className="icon">
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10V7C6 4.23858 8.23858 2 11 2H13C15.7614 2 18 4.23858 18 7V10" stroke="#888" strokeWidth={2} />
                        <rect x={4} y={10} width={16} height={12} rx={2} stroke="#888" strokeWidth={2} />
                        <path d="M12 15V17" stroke="#888" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                    </span>

                  </span>
                  <input {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min length 8 chars' } })} type={ShowPassword? 'text' : "password"} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                  <span className="eye-icon show-pass p-3" onClick={togglePasswordVisibility} style={{cursor: 'pointer'}}>
                    
                    {ShowPassword ? (
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                        <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                        <line x1="2" y1="2" x2="22" y2="22" stroke="#888" strokeWidth={2} />
                      </svg>
                    ) : (
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                        <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                      </svg>
                    )}



                  </span>


                  {/* <span className="eye-icon hide-pass p-3">
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                      <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                      <line x1={3} y1={3} x2={21} y2={21} stroke="#888" strokeWidth={2} />
                    </svg>
                  </span> */}


                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                <div className="links d-flex justify-content-between my-4">
                  <Link className='text-register text-decoration-none fw-bold' to='register'>Register Now?</Link>
                  <Link className='text-forget text-decoration-none fw-bold' to='forget-password'>Foregt Password?</Link>
                </div>
                <button className='btn btn-success w-100 mb-3 fs-5 fw-bold py-2'>Login</button>
                <ToastContainer />


              </form>

            </div>


          </div>


        </div>



      </div>


    </div>





  </>;
}

