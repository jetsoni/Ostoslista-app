import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import TestComponent from './components/TestComponent/TestComponent';

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
