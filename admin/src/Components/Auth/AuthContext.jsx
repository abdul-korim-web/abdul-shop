import { createContext, useEffect, useState } from "react";
import Login from "./Login";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("abdul_shop_admin_token") || ""
  );
  const [admin, setAdmin] = useState({});
  return (
    <AuthContext.Provider value={{ token, setToken, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
