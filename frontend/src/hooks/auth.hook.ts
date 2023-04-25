import { useCallback, useEffect, useState } from 'react';

const userData = 'userData';

interface IUseAuth {
  login(jwtToken: string, id: string, email: string): void;
  logout(): void;
  token: string;
  userId: string;
  userEmail: string;
}

type UserData = {
  token: string;
  userId: string;
  userEmail: string;
};

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const login = useCallback(
    (jwtToken: string, id: string, email: string): void => {
      setToken(jwtToken);
      setUserId(id);
      setUserEmail(email);

      localStorage.setItem(
        userData,
        JSON.stringify({ userId: id, token: jwtToken, userEmail: email })
      );
    },
    []
  );

  const logout = useCallback((): void => {
    setToken('');
    setUserId('');
    setUserEmail('');

    localStorage.removeItem(userData);
  }, []);

  useEffect(() => {
    const data: UserData = JSON.parse(localStorage.getItem(userData) as string);
    if (data && data.token) {
      login(data.token, data.userId, data.userEmail);
    }
  }, [login]);

  return { login, logout, token, userId, userEmail };
};
