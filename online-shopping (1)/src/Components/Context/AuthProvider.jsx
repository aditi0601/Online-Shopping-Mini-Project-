import React, { useState, useContext } from "react";
import AuthenticationContext from './AuthenticationContext'
const AuthProvider = ({children}) =>
{
  const [currentUser, setCurrentUser] = useState(() => {
    // Initialize the user from local storage if available
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      };
    
      const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      };

    return(
        <AuthenticationContext.Provider value={{currentUser, login, logout}}>
        {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthenticationContext);
  };