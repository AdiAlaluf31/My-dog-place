import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

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