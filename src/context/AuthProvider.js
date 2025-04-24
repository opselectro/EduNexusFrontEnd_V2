import React, { createContext, useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
 

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Stored User in AuthProvider:", parsedUser); 
        setUser(parsedUser);
        setIsAdmin(parsedUser.role?.toUpperCase() === "ADMIN");
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user"); 
      }
      
    }
   setLoading(false)
  },
   []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, setUser, logout,login,loading }}>
      {!loading&&children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
