import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

type UserType = {
  email: string;
  password: string;
};

const AuthForm: FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<UserType>({
    email: '',
    password: '',
  });

  const onChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  // Next step, refactoring: `register`, `login` and `logout` functions will be called via custom hook.
  // This hook will be named `AuthHook`
  const loginUser = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        }
      );
      if (response.status === 200) {
        const json = await response.json();
        auth.login(json.token, json.userId, user.email);
        setUser({
          email: '',
          password: '',
        });
        navigate('/');
      }
    } catch (err) {}
  };

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <form onSubmit={loginUser}>
        <div className='form-group' style={{ marginBottom: '25px' }}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={user.email}
            onChange={onChangeUser}
            name='email'
          />
        </div>
        <div className='form-group' style={{ marginBottom: '25px' }}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            value={user.password}
            onChange={onChangeUser}
            name='password'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
