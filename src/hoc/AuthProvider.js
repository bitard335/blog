import { createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isAuth = false;

  return <AuthContext.Provider value={{ isAuth: isAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
