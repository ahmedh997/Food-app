import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CATEGORIES_ENDPOINTS, RECIPES_ENDPOINTS, TAGS_ENDPOINT } from '../../Services/api/apiConfig';
import { privateApiInstance } from '../../Services/api/apiInstance';
import { toast } from 'react-toastify';

export default function RecipeData() {



    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
  
    // get Categories List
    const getCategoriesList = async () => {
      try {
        let list = await privateApiInstance.get(CATEGORIES_ENDPOINTS.GET_CATEGORIES());
        console.log(list?.data);
        setCategories(list?.data?.data);
      }
      catch (error) {
        console.log(error);
      }
  
    };
  
    // get tags List
    const getTagsList = async () => {
      try {
        let tags = await privateApiInstance.get(TAGS_ENDPOINT.GET_TAGS);
        console.log(tags?.data);
        setTags(tags?.data);
      }
      catch (error) {
        console.log(error);
      }
  
    };




  let { register, formState: { errors, isSubmitting }, handleSubmit, setValue } = useForm();

  // add New Category
  const addNewRecipe = async (data) => {
    try {
      let addNew = await privateApiInstance.post(RECIPES_ENDPOINTS.ADD_RECIPE, data);
      console.log(addNew);
      getCategoriesList();
      toast.success('Category added successfully');
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

    useEffect(() => {
      getCategoriesList();
      getTagsList();
    }, []);


  return <>


    <div>
      <main>
        <header className='bg-addnew rounded-4 m-3 p-4'>
          <row className="d-flex justify-content-between align-items-center">
            <div>
              <h3>Show <span className='text-success'>Recipes!</span></h3>
              <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <div className="buttonLink">
              <Link to='/dashboard/recipes' className='btn btn-success px-5'>All Recipes  <i className='fas fa-arrow-right'> </i></Link>
            </div>
          </row>
        </header>
        <section className="add-section m-3 p-5 w-75 m-auto">
          <form onSubmit={handleSubmit(addNewRecipe)}>
            <div className="">
              <div className="form-inputs input-group mb-3">
                <input {...register('name')} type="text" className="form-control py-3" placeholder="Recipe Name" aria-label="Name" aria-describedby="basic-addon1" />
              </div>
            </div>
            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
            <div className="">
              <div className="form-inputs input-group mb-3">
                <input {...register('price')} type="number" className="form-control py-3" placeholder="Price" aria-label="price" aria-describedby="basic-addon1" />
              </div>
            </div>
            {errors.price && <span className='text-danger'>{errors.price.message}</span>}
            {/* select tag */}
            <div className={`form-inputs input-group mb-3 d-flex`}>
              <select className="form-select form-control py-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <option value="">Tags</option>
                {tags?.map(({ id, name }) => (
                  <option value={id} key={id}>{name}</option>
                ))}

              </select>
            </div>

            {/* select category */}
            <div className={`form-inputs input-group mb-3 d-flex`}>
              <select className="form-select form-control py-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <option value="">Categories</option>
                {categories?.map(({ id, name }) => (
                  <option value={id} key={id}>{name}</option>
                ))}
              </select>
            </div>
            <div className="">
              <div className="form-inputs input-group mb-3">
                <textarea {...register('description')} type="text" className="form-control py-3" placeholder="description" aria-label="description" aria-describedby="basic-addon1" />
              </div>
            </div>
            {errors.description && <span className='text-danger'>{errors.description.message}</span>}
            <div className="">
              <div className="form-inputs input-group mb-3">
                <input {...register('recipeImage')} type="file" className="form-control py-3" placeholder="recipe Image" aria-label="recipeImage" aria-describedby="basic-addon1" />
              </div>
            </div>
            {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}
            <div className="mt-3 d-flex gap-5 justify-content-end">
              <Link to={'/dashboard/recipes'} disabled={isSubmitting} className='btn btn-outline-dark mb-3 fs-5 fw-medium px-4'>Cancel</Link>
              <button type="submit" disabled={isSubmitting} className='btn btn-success mb-3 fs-5 fw-medium px-4'>{isSubmitting ? <i className='fas fa-spinner fa-spin'></i> : 'Save'}</button>
            </div>
          </form>
        </section>
      </main>

     
    </div>



  </>;
}
