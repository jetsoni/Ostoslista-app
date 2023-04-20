import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

type UserType = {
  email: string;
  password: string;
};

const AuthForm: FC = () => {
  const [user, setUser] = useState<UserType>({
    email: '',
    password: '',
  });

  const changeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  // Next step, refactoring: `register`, `login` and `logout` functions will be called via custom hook.
  // This hook will be named `AuthHook`
  const registerUser = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    console.log('registerUser', user);
    try {
      // need to fix
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
        // Next step: need to add at localStorage JWT token
        // Start.
        // ........................
        // End.
        const json = await response.json();
        setUser({
          email: '',
          password: '',
        });
      }
    } catch (err) {}
  };

  return (
    <form onSubmit={registerUser}>
      <div className='form-group'>
        <label htmlFor='email'>Email address</label>
        <input
          type='email'
          className='form-control'
          id='email'
          aria-describedby='emailHelp'
          placeholder='Enter email'
          value={user.email}
          onChange={changeUser}
          name='email'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          placeholder='Password'
          value={user.password}
          onChange={changeUser}
          name='password'
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
