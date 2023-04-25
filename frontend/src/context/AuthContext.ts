import { createContext } from 'react';

export const AuthContext = createContext({
  token: '',
  userId: '',
  login: (jwtToken: string, id: string, email: string) => {},
  logout: () => {},
  isAuthenticated: false,
  userEmail: '',
});
