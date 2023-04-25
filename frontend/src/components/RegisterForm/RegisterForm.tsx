import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RegisterUserType = {
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<RegisterUserType>({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const onChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const registerUser = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (user.password === user.repeatPassword) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/auth/register`,
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
        if (response.status === 201) {
          await response.json();
          setUser({
            email: '',
            password: '',
            repeatPassword: '',
          });
          navigate('/');
        }
      } else {
        console.error('Please enter correct passwords');
      }
    } catch (err) {}
  };

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <form onSubmit={registerUser}>
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
        <div className='form-group' style={{ marginBottom: '25px' }}>
          <label htmlFor='repeatPassword'>Repeat password</label>
          <input
            type='password'
            className='form-control'
            id='repeatPassword'
            placeholder='Repeat password'
            value={user.repeatPassword}
            onChange={onChangeUser}
            name='repeatPassword'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
