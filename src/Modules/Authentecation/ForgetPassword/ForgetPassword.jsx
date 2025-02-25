import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { axiosClient, USER_URLS } from '../../Services/urls/urls';
import { emailValidation } from '../../Services/Validations/validations';



export default function ForgetPassword() {


  const navigate = useNavigate();

  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    

    try {

      let res = await axiosClient.post(USER_URLS.forger_pass, data);
      
      
      toast.success("Your request is being processed, please check your email");

      navigate('/reset-password', { state: { email: data.email }});

    }
    catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return <>

    <div className="title">
      <h3 className='h4 fw-bold'>Forgot Your Password?</h3>
      <p className='text-muted'>No worries! Please enter your email and we will send a password reset link</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-inputs input-group mt-3">
        <span className="input-group-text p-3" id="basic-addon1">

          <span className="icon">
            <svg aria-label='mobile' width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 3H17.5C18.3284 3 19 3.67157 19 4.5V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V4.5C5 3.67157 5.67157 3 6.5 3Z" stroke="#888" strokeWidth="2" />
              <path d="M12 17H12.01" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <input {...register('email', emailValidation)} type="text" className="form-control" placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1" />
      </div>
      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
      <button disabled={isSubmitting} className='btn btn-success w-100 mb-3 fs-5 fw-bold py-2 my-5'>{isSubmitting ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}</button>
      


    </form>

  </>;
}

