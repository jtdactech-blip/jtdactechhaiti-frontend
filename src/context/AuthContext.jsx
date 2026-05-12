import React, { createContext, useEffect, useState } from "react";

import { getToken, getUserRole, logout } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setUser({
        token,
        role: getUserRole(),
      });
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setUser({
      token,
      role: getUserRole(),
    });
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
