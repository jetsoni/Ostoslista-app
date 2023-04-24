import React from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { login, logout, token, userId, userEmail } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, userEmail, isAuthenticated }}
    >
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
