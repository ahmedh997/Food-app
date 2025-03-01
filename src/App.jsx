import { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
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
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Modules/Shared/ProtectedRoute/ProtectedRoute';
import ChangePassword from './Modules/Authentecation/ChangePassword/ChangePassword';

function App() {

  const [loginData, setloginData] = useState(null);

  const saveLoginData = () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedData = jwtDecode(token);
        setloginData(decodedData);

      } else {
        setloginData(null);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setLoginData(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    
    if (localStorage.getItem('token')) {
      saveLoginData();
    }

  }, []);





  const router = createHashRouter([

    {
      path: '',
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: '/login', element: <Login saveLoginData={saveLoginData} /> },
        { path: '/register', element: <Register /> },
        { path: '/forget-password', element: <ForgetPassword /> },
        { path: '/reset-password', element: <ResetPassword /> },
        { path: '/Verify-account', element: <VerifyAccount /> },



      ]
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><MasterLayout loginData={loginData} /></ProtectedRoute>,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'recipe-data', element: <RecipeData /> },
        { path: 'categories', element: <Categories /> },
        { path: 'category', element: <CategoriesData /> },
        { path: 'users', element: <UsersList /> },
      ]
    }

  ]);

  return <>

    <RouterProvider router={router} />

  </>;
}

export default App;
