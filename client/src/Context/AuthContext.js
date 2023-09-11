import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [action,setAction]= useState('register');
  const [user,setUser]= useState(JSON.parse(localStorage.getItem("user")));
  const [token,setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", token);
    
  }, [user, token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        action,
        setAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};