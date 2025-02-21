import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout';
import Notfound from './Modules/Shared/Notfound/Notfound';
import Login from './Modules/Authentecation/login/Login';
import Register from './Modules/Authentecation/Register/Register';
import ForgetPassword from './Modules/Authentecation/ForgetPassword/ForgetPassword';
import ResetPassword from './Modules/Authentecation/ResetPassword/ResetPassword';
import VerifyAccount from './Modules/Authentecation/VerifyAccount/VerifyAccount';
import MasterLayout from './Modules/Shared/MasterLayout/MasterLayout';
import Dashboard from './Modules/Dashboard/Dashboard';
import Categories from './Modules/Categories/CategoriesList/Categories';
import CategoriesData from './Modules/Categories/CategoriesData/CategoriesData';
import RecipesList from './Modules/Recipes/RecipeList/RecipesList';
import RecipeData from './Modules/Recipes/RecipeData/RecipeData';
import UsersList from './Modules/Users/UsersList';

function App() {


  const router = createBrowserRouter([

    {
      path: '',
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'Verify-account', element: <VerifyAccount /> },



      ]
    },
    {
      path: '/dashboard',
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'recipe-data', element: <RecipeData /> },
        { path: 'categories', element: <Categories /> },
        { path: 'category', element: <CategoriesData /> },
        { path: 'user', element: <UsersList /> },



      ]
    }

  ]);

  return <>
  
    <RouterProvider router={router} />
  
  </>
}

export default App
