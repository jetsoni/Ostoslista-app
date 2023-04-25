import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import TestComponent from './components/TestComponent/TestComponent';
import Items from './components/Items/Items';
import Recipes from './components/Recipes/Recipes';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

export const useRoutes = (isAuthenticated: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading) {
    if (isAuthenticated) {
      return (
        <Routes>
          <Route path='/' element={<TestComponent />} />
          <Route path='/items' element={<Items />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path='/login' element={<AuthForm />} />
        <Route path='/registration' element={<RegisterForm />} />
        <Route path='*' element={<TestComponent />} />
      </Routes>
    );
  }

  return <div>Loading ...</div>;
};
