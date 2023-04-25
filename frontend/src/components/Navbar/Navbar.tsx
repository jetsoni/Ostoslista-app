import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading) {
    return (
      <nav>
        <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Ostos Lista
        </h1>
        {!auth.isAuthenticated && <Link to='/login'>Login</Link>}
        {!auth.isAuthenticated && <Link to='/registration'>Register</Link>}
        {auth.isAuthenticated && (
          <>
            <Link to='/items'>Items</Link>
            <Link to='/recipes'>Recipes</Link>
            <Link to='/shopping-cart'>Shopping Cart</Link>
            <div style={{ cursor: 'pointer' }} onClick={() => auth.logout()}>
              Logout
            </div>
            <div>Profile: {auth.userEmail}</div>
          </>
        )}
      </nav>
    );
  }

  return <></>;
};

export default Navbar;
