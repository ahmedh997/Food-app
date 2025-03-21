import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CategoriesData({ addNewCategory, editCategory, categoryToEdit }) {
  const { register, formState: { errors, isSubmitting }, handleSubmit, setValue, reset } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (categoryToEdit) {
      setIsEditing(true);
      setValue('name', categoryToEdit.name);
    } else {
      setIsEditing(false);
      reset();
    }
  }, [categoryToEdit, setValue, reset]);

  const onSubmit = (data) => {
    if (isEditing) {
      editCategory(data);
    } else {
      addNewCategory(data);
    }
  };

  const closeModal = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <>
      {/* Add New Category Modal */}
      <div className="modal fade mt-5" tabIndex={-1} id="addNewCategory" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
              <h3>{isEditing ? 'Edit Category' : 'Add Category'}</h3>
              <button
                id="closeModal"
                type="button"
                style={{ width: "40px", height: "40px" }}
                className="bg-transparent border-danger m-2 p-2 rounded-circle text-danger fa-close fas ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              <div className="form-inputs input-group">
                <input
                  {...register('name', { required: 'Category name is required' })}
                  type="text"
                  className="form-control py-3"
                  placeholder="Category Name"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.name && <span className='text-danger'>{errors.name.message}</span>}
            </div>
            <div className="modal-footer">
              <button type="submit" disabled={isSubmitting} className='btn btn-success fs-5 fw-medium mb-3 px-4'>
                {isSubmitting ? <i className='fa-spin fa-spinner fas'></i> : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}