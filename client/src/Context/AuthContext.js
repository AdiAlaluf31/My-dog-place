import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [action,setAction]= useState('register');
  const [user,setUser]= useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        action,
        setAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};