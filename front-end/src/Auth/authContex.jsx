import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { user_api } from "../Config/SarverURL";

export const AuthContex = createContext();
const AuthProvider = ({ children }) => {

  
  const [token, setToken] = useState(
    localStorage.getItem("abdul_shop_token") || ""
  );
    const [userCart, setUserCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${user_api}/myinfo`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data?.success) {
        console.log("user info found");
        setUserInfo(res?.data?.userInfo);
      } else {
        console.log("user Not found ");
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [token]);
  return (
    <AuthContex.Provider value={{ token, setToken, userCart, setUserCart,userInfo }}>
      {children}
    </AuthContex.Provider>
  );
};
export default AuthProvider;
