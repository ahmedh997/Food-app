import React, { use, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES_ENDPOINTS, RECIPES_ENDPOINTS, TAGS_ENDPOINT } from '../../Services/api/apiConfig';
import { privateApiInstance } from '../../Services/api/apiInstance';
import { toast } from 'react-toastify';

export default function RecipeData() {

  const params = useParams();
  const recipeId = params.recipeId;
  console.log(recipeId);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const Navigate = useNavigate();

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
    const formData = new FormData();

    for (let key in data) {
      if (key === 'recipeImage') {
        formData.append(key, data?.[key]?.[0]);
      }
      else {
        formData.append(key, data?.[key]);
      }
    }
    if (recipeId !== 'new-recipe') {
      try {
        let editRecipe = await privateApiInstance.put(RECIPES_ENDPOINTS.UPDATE_RECIPE(recipeId), data);
        console.log(editRecipe);
        getCategoriesList();
        toast.success('Category Updated successfully');
        Navigate('/dashboard/recipes');
      }
      catch (error) {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      }
    }
    else {
      try {
        let addNew = await privateApiInstance.post(RECIPES_ENDPOINTS.ADD_RECIPE, formData);
        console.log(addNew);
        getCategoriesList();
        toast.success('Category added successfully');
        Navigate('/dashboard/recipes');
      }
      catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }

    }
  };

  useEffect(() => {
    (async () =>{
    await  getCategoriesList();
    await getTagsList();

    if (recipeId !== 'new-recipe') {
      const getRecipe = async () => {
        const response = await privateApiInstance.get(RECIPES_ENDPOINTS.GET_RECIPE_BY_ID(recipeId));
        const recipe = response?.data;
        setValue('name', recipe?.name);
        setValue('price', recipe?.price);
        setValue('tagId', recipe?.tag?.id);
        setValue('recipeImage', recipe?.recipeImage?.[0]);
        setValue('description', recipe?.description);
        setValue('categoriesIds', recipe?.category?.[0].id);
      };
      getRecipe();
    }
  })();
}, [recipeId, setValue]);


return <>


  <div>
    <main>
      <header className='bg-addnew m-3 p-4 rounded-4'>
        <row className="d-flex align-items-center justify-content-between">
          <div>
            <h3>Show The <span className='text-success'>Recipes!</span></h3>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
          </div>
          <div className="buttonLink">
            <Link to='/dashboard/recipes' className='btn btn-success px-5'>All Recipes  <i className='fa-arrow-right fas'> </i></Link>
          </div>
        </row>
      </header>


      <section className="m-3 m-auto p-5 w-75 add-section">
        <form onSubmit={handleSubmit(addNewRecipe)}>
          <div className="">
            <div className="form-inputs input-group mb-3">
              <input {...register('name', { required: 'Name is Required' })} type="text" className="form-control py-3" placeholder="Recipe Name" aria-label="Name" aria-describedby="basic-addon1" />
            </div>
          </div>
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}


          <div className="">
            <div className="form-inputs input-group mb-3">
              <input {...register('price', { required: 'Price is Required' })} type="number" className="form-control py-3" placeholder="Price" aria-label="price" aria-describedby="basic-addon1" />
            </div>
          </div>
          {errors.price && <span className='text-danger'>{errors.price.message}</span>}


          {/* select tag */}
          <div className={`form-inputs input-group mb-3 d-flex`}>
            <select {...register('tagId', { required: 'Tag is Required' })} className="form-control form-select py-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <option value="">Tags</option>
              {tags?.map(({ id, name }) => (
                <option value={id} key={id}>{name}</option>
              ))}

            </select>
          </div>

          {/* select category */}
          <div className={`form-inputs input-group mb-3 d-flex`}>
            <select {...register('categoriesIds', { required: 'Category is Required' })} className="form-control form-select py-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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

          <div className="bg-add-img rounded-4 text-center" >
            <div className="form-inputs mb-3" role='button'>
              <input {...register('recipeImage')} type="file" className="py-5 " placeholder="Recipe Image" aria-label="recipeImage" aria-describedby="basic-addon1" />
            </div>
          </div>
          {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}

          <div className="d-flex justify-content-end gap-5 mt-3">
            <Link to={'/dashboard/recipes'} disabled={isSubmitting} className='btn btn-outline-dark fs-5 fw-medium mb-3 px-4'>Cancel</Link>
            <button type="submit" disabled={isSubmitting} className='btn btn-success fs-5 fw-medium mb-3 px-4'>{isSubmitting ? <i className='fa-spin fa-spinner fas'></i> : 'Save'}</button>
          </div>
        </form>
      </section>
    </main>


  </div>



</>;
}
