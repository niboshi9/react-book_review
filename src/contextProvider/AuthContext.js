// import * as React from "react";
import React, { createContext, useState, useContext } from "react"


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true)
  
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  return useContext(AuthContext)
}