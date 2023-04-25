import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading) {
    return (
      <nav>
        <h1>Ostos Lista</h1>
        {!auth.isAuthenticated && <Link to='/login'>Login</Link>}
        {!auth.isAuthenticated && <Link to='/registration'>Register</Link>}
        {auth.isAuthenticated && (
          <div style={{ cursor: 'pointer' }} onClick={() => auth.logout()}>
            Logout (user email: {auth.userEmail})
          </div>
        )}
      </nav>
    );
  }

  return <></>;
};

export default Navbar;
