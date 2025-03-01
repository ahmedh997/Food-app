import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosClient, USER_URLS } from '../../Services/urls/urls';
import { confirmPasswordValidation, passwordValidation } from '../../Services/Validations/validations';
import logo from '../../../assets/images/Auth-logo.png';


export default function ChangePassword() {

  let { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm();

  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowNewPassword, setShowNewPassword] = useState(false);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const togglePasswordVisibility = () => setShowPassword(!ShowPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!ShowNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!ShowConfirmPassword);


  const password = watch('newPassword')
  
  const changePass = async (data) => {

    
    try{

      let change = await axiosClient.put(USER_URLS.change_pass, data, { headers: { Authorization: localStorage.getItem('token') } });
      console.log(change.data.message);
      toast.success(change.data.message);

    }
    catch (error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="modal fade px-5 py-3 rounded-4" id="changePasswordModal" tabIndex="-1" aria-hidden="true" >
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="modal-header d-flex flex-column justify-content-center align-items-center">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="logo-container text-center">
              <img className='w-50 m-3' src={logo} alt="Logo Food App" />
            </div>
          </div>
            <div className="text-start mx-3 modal-title">
              <h5>Change Your Password</h5>
              <p className='text-muted'>Enter your details below</p>
              </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(changePass)}>
              {/* current password  */}
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
                <input {...register('oldPassword', passwordValidation)} type={ShowPassword ? 'text' : "password"} className="form-control" placeholder="Old Password" aria-label="Password" aria-describedby="basic-addon1" />
                <span className="eye-icon show-pass p-3" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>

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
              {/* new password  */}
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
                <input {...register('newPassword', passwordValidation)} type={ShowNewPassword ? 'text' : "password"} className="form-control" placeholder="New Password" aria-label="Password" aria-describedby="basic-addon1" />
                <span className="eye-icon show-pass p-3" onClick={toggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>

                  {ShowNewPassword ? (
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
              {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}
              {/* confirm new password  */}
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
                <input {...register('confirmNewPassword', confirmPasswordValidation(password))} type={ShowConfirmPassword ? 'text' : "password"} className="form-control" placeholder="Confirm New Password" aria-label="Password" aria-describedby="basic-addon1" />
                <span className="eye-icon show-pass p-3" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>

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
              {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}

              <button disabled={isSubmitting} className='btn btn-success w-100 mt-3 fs-5 fw-bold py-2'>{isSubmitting ? <i className='fas fa-spinner fa-spin'></i> : 'Change Password'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
