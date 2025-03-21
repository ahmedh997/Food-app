import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiInstance } from '../../Services/api/apiInstance';
import { USERS_ENDPOINTS } from '../../Services/api/apiConfig';
import { emailValidation } from '../../Services/Validations/validations';
import { toast } from 'react-toastify';

export default function VerifyAccount() {

  let { state } = useLocation();


  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({ defaultValues: { email: state?.email } }, { mode: "onChange" });


  const navigate = useNavigate();

  const onSubmit = async (data) => {


    try {
      let res = await apiInstance.put(USERS_ENDPOINTS.VERIFY, data);

      console.log(res);

      toast.success(res?.data?.message || 'Account verified successfully');

      navigate('/', { state: { email: data.email } });

    }
    catch (err) {
      console.log(err);
      
      toast.error(err?.response?.data?.message);
    }
  };


  return <>

    <div className="title">
      <h3 className='h4 fw-bold'> Verify Account</h3>
      <p className='text-muted'>Please Enter Your Otp or Check Your Inbox</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-inputs input-group mb-2 mt-4">

        {/* email  */}
        <span className="input-group-text p-3" id="basic-addon1">
          <span className="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 3H17.5C18.3284 3 19 3.67157 19 4.5V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V4.5C5 3.67157 5.67157 3 6.5 3Z" stroke="#888" strokeWidth="2" />
              <path d="M12 17H12.01" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <input {...register('email', emailValidation)} type="text" className="form-control" placeholder="E-mail" aria-label="Email" aria-describedby="basic-addon1" />
      </div>
      {errors.email && <span className='text-danger'>{errors.email.message}</span>}

      {/* Code  */}
      <div className="input-group mb-2 mt-4 d-flex align-items-center justify-content-between">
        <span className="input-group-text p-3" id="basic-addon1">

          <span className="icon">
            <svg aria-label='lock' width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10V7C6 4.23858 8.23858 2 11 2H13C15.7614 2 18 4.23858 18 7V10" stroke="#888" strokeWidth={2} />
              <rect x={4} y={10} width={16} height={12} rx={2} stroke="#888" strokeWidth={2} />
              <path d="M12 15V17" stroke="#888" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </span>

        </span>
        <input {...register('code', { required: 'OTP is required', })} type="text" className="form-control" placeholder="OTP" aria-label="Password" aria-describedby="basic-addon1" />
      </div>
      {errors.code && <span className='text-danger'>{errors.code.message}</span>}

      <button disabled={isSubmitting} className='btn btn-success w-100 mb-3 fs-5 fw-medium py-2 my-4'>{isSubmitting ? <i className='fas fa-spinner fa-spin'></i> : 'Send'}</button>

    </form >

  </>;



}
