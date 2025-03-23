import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function FavoritesList() {
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {

    setLoginData(JSON.parse(localStorage.getItem('userData')));
    if (loginData?.userGroup === 'SuperAdmin') {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div>FavoritesList</div>
  );
}
