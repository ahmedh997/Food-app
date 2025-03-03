import React from 'react';
import { useForm } from 'react-hook-form';

export default function AddNewCategory({ addNewCategory }) {



    let { register,formState: { errors, isSubmitting }, handleSubmit } = useForm();



    return <>

        <div className="modal fade mt-5" tabIndex={-1} id="addNewCategory" aria-hidden="true" >
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleSubmit(addNewCategory)}>
                    <div className="modal-header">
                        <h3>Add Category</h3>
                        <button id="closeAddCategory" type="button" style={{ width: "40px", height: "40px" }} className="fas fa-close ms-auto text-danger bg-transparent border-danger rounded-circle m-2 p-2" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="form-inputs input-group">
                            <input {...register('name')} type="text" className="form-control py-3" placeholder="Category Name" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                    <div className="modal-footer">
                        <button type="submit" disabled={isSubmitting} className='btn btn-success mb-3 fs-5 fw-medium px-4'>{isSubmitting ? <i className='fas fa-spinner fa-spin'></i> : 'Save'}</button>
                    </div>
                </form>
            </div>
        </div>


    </>;
}
