import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { confirmPasswordValidation, emailValidation, passwordValidation, userNameValidation } from '../../Services/Validations/validations';
import { apiInstance } from '../../Services/api/apiInstance';
import { USERS_ENDPOINTS } from '../../Services/api/apiConfig';

export default function Register() {


  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!ShowPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!ShowConfirmPassword);

  let { register, formState: { errors, isSubmitting }, handleSubmit, watch, trigger } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const navigate = useNavigate();




  const onSubmit = async (data) => {

    try {
      let res = await apiInstance.post(USERS_ENDPOINTS.REGISTER, data);
      console.log(res);


      toast.success(res?.data?.message);
      navigate('/Verify-account', { state: { email: data?.email } });

    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };  


  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);
  return <>

    <div className="title">
      <h3 className='fw-bold h4'>Register</h3>
      <p className='text-muted'>Please enter your details</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>


      <div className="row">
        <div className="col-md-6">
          {/* User Name  */}
          <div className="form-inputs input-group mb-2 mt-4">
            <span className="input-group-text p-3" id="basic-addon1">
              <span className="icon">
                <svg aria-label="user" width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="#888" strokeWidth={2} />
                  <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#888" strokeWidth={2} />
                </svg>
              </span>
            </span>
            <input {...register('userName', userNameValidation)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}

          {/* Country  */}
          <div className="d-flex input-group align-items-center justify-content-between mb-2 mt-4">
            <span className="input-group-text p-3" id="basic-addon1">

              <span className="icon">
                <svg aria-label="globe" width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#888" strokeWidth={2} />
                  <path d="M2 12H22" stroke="#888" strokeWidth={2} strokeLinecap="round" />
                  <path d="M12 2C15.866 6 15.866 18 12 22C8.13401 18 8.13401 6 12 2Z" stroke="#888" strokeWidth={2} />
                </svg>
              </span>

            </span>
            <input {...register('country', { required: 'Country is required' })} type='text' className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1" />
          </div>
          {errors.country && <span className='text-danger'>{errors.country.message}</span>}
          {/* password  */}
          <div className="d-flex input-group align-items-center justify-content-between mb-2 mt-4">
            <span className="input-group-text p-3" id="basic-addon1">

              <span className="icon">
                <svg aria-label='lock' width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10V7C6 4.23858 8.23858 2 11 2H13C15.7614 2 18 4.23858 18 7V10" stroke="#888" strokeWidth={2} />
                  <rect x={4} y={10} width={16} height={12} rx={2} stroke="#888" strokeWidth={2} />
                  <path d="M12 15V17" stroke="#888" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </span>

            </span>
            <input {...register('password', passwordValidation)} type={ShowPassword ? 'text' : "password"} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
            <span className="p-3 eye-icon show-pass" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>

              {ShowPassword ? (
                <svg aria-label='eye-lash' width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                  <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                  <line x1="2" y1="2" x2="22" y2="22" stroke="#888" strokeWidth={2} />
                </svg>
              ) : (
                <svg aria-label='eye' width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                  <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                </svg>
              )}
            </span>
          </div>
          {errors.password && <span className='text-danger'>{errors.password.message}</span>}
        </div>
        <div className="col-md-6">
          {/* email  */}
          <div className="form-inputs input-group mb-2 mt-4">
            <span className="input-group-text p-3" id="basic-addon1">
              <span className="icon">
                <svg aria-label="email" width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="#888" strokeWidth={2} />
                  <path d="M3 6L12 13L21 6" stroke="#888" strokeWidth={2} />
                </svg>
              </span>
            </span>
            <input {...register('email', emailValidation)} type="text" className="form-control" placeholder="E-mail" aria-label="Email" aria-describedby="basic-addon1" />
          </div>
          {errors.email && <span className='text-danger'>{errors.email.message}</span>}

          {/* phone  */}
          <div className="d-flex input-group align-items-center justify-content-between mb-2 mt-4">
            <span className="input-group-text p-3" id="basic-addon1">

              <span className="icon">
                <svg aria-label='mobile' width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 3H17.5C18.3284 3 19 3.67157 19 4.5V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V4.5C5 3.67157 5.67157 3 6.5 3Z" stroke="#888" strokeWidth="2" />
                  <path d="M12 17H12.01" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

            </span>
            <input {...register('phoneNumber', { required: 'Phone Number is required' })} type='tel' className="form-control" placeholder="Phone Number" aria-label="Phone" aria-describedby="basic-addon1" />
          </div>
          {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}

          {/* Confirm password  */}
          <div className="d-flex input-group align-items-center justify-content-between mb-2 mt-4">
            <span className="input-group-text p-3" id="basic-addon1">

              <span className="icon">
                <svg aria-label='lock' width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10V7C6 4.23858 8.23858 2 11 2H13C15.7614 2 18 4.23858 18 7V10" stroke="#888" strokeWidth={2} />
                  <rect x={4} y={10} width={16} height={12} rx={2} stroke="#888" strokeWidth={2} />
                  <path d="M12 15V17" stroke="#888" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </span>

            </span>
            <input {...register('confirmPassword', confirmPasswordValidation(password))} type={ShowConfirmPassword ? 'text' : "password"} className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" />
            <span className="p-3 eye-icon show-pass" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>

              {ShowConfirmPassword ? (
                <svg aria-label='eye-lash' width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                  <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                  <line x1="2" y1="2" x2="22" y2="22" stroke="#888" strokeWidth={2} />
                </svg>
              ) : (
                <svg aria-label='eye' width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C3.5 6 8 3 12 3C16 3 20.5 6 23 12C20.5 18 16 21 12 21C8 21 3.5 18 1 12Z" stroke="#888" strokeWidth={2} />
                  <circle cx={12} cy={12} r={3} stroke="#888" strokeWidth={2} />
                </svg>
              )}
            </span>
          </div>
          {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
        </div>
      </div>





      {/* links  */}
      <div className="d-flex justify-content-end links my-4">
        <Link className='text-decoration-none text-forget fw-medium' to='/login'>Login Now?</Link>
      </div>


      <button disabled={isSubmitting} className='btn btn-success w-100 fs-5 fw-medium mb-3 py-2'>{isSubmitting ? <i className='fa-spin fa-spinner fas'></i> : 'Register'}</button>



    </form>

  </>;
}
