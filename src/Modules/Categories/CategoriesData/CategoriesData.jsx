import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function CategoriesData({ addNewCategory, editCategory, categoryToEdit }) {
  

  let { register, formState: { errors, isSubmitting }, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (categoryToEdit){
      setValue('name', categoryToEdit?.name);
    }
    

  }, [categoryToEdit,setValue])
  

  return <>


    {/* add New Category modal  */}
    <div className="modal fade mt-5" tabIndex={-1} id="addNewCategory" aria-hidden="true" >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit(addNewCategory)}>
          <div className="modal-header">
            <h3>Add Category</h3>
            <button id="closeAddCategory" type="button" style={{ width: "40px", height: "40px" }} className="bg-transparent border-danger m-2 p-2 rounded-circle text-danger fa-close fas ms-auto" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="form-inputs input-group">
              <input {...register('name')} type="text" className="form-control py-3" placeholder="Category Name" aria-label="Name" aria-describedby="basic-addon1" />
            </div>
          </div>
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
          <div className="modal-footer">
            <button type="submit" disabled={isSubmitting} className='btn btn-success fs-5 fw-medium mb-3 px-4'>{isSubmitting ? <i className='fa-spin fa-spinner fas'></i> : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>



    {/* edit Category Modal */}
    <div className="modal fade mt-5" tabIndex={-1} id="editCategory" aria-hidden="true" >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit(editCategory)}>
          <div className="modal-header">
            <h3>Edit Category</h3>
            <button id="closeEditCategory" type="button" style={{ width: "40px", height: "40px" }} className="bg-transparent border-danger m-2 p-2 rounded-circle text-danger fa-close fas ms-auto" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="form-inputs input-group">
              <input {...register('name')} type="text" className="form-control py-3" placeholder="Category Name" aria-label="Name" aria-describedby="basic-addon1" />
            </div>
          </div>
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
          <div className="modal-footer">
            <button type="submit" disabled={isSubmitting} className='btn btn-success fs-5 fw-medium mb-3 px-4'>{isSubmitting ? <i className='fa-spin fa-spinner fas'></i> : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>









  </>;
}
