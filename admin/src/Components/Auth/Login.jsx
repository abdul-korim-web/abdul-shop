import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";

import { api_url } from "../../config";

const Login = () => {
  const [email, setEmail] = useState("abdulkorim@abdulshop.com");
  const [password, setPassword] = useState("korim+Abdulshop@77");
  const navigate = useNavigate()
  const {setToken,setAdmin} = useContext(AuthContext)
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${api_url}/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res?.data?.success === true) {
        toast.success(res?.data?.message)
        await localStorage.setItem("abdul_shop_admin_token", res.data.token);
        setToken(res.data.token)
        setAdmin(res.data.admininfo)
        navigate("/")
      } else {
        toast.error(res?.data?.message || "unknown error");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed")
    }
  };
  return (
    <section className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-10 shadow-2xl rounded-2xl flex flex-col space-y-5 w-[80%] md:w-[450px]">
        <div className="flex flex-col justify-center items-center space-y-2">
          <img src="image/vite.svg" alt="" className="w-10" />
          <h2 className="font-mono italic font-semibold text-3xl">Login</h2>
        </div>

        <form
          action=""
          className="flex flex-col space-y-3 w-full"
          onSubmit={handelLogin}
        >
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-sm text-gray-800 italic">
              Enter Your Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="enter your email"
              className="border border-gray-600 px-4 py-1 rounded-xl focus:outline-blue-500"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Enter Your Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="enter your password"
              className="border border-gray-600 px-4 py-1 rounded-xl focus:outline-blue-500"
            />
          </div>
          <div className="mt-2">
            <Button color="primary" variant="contained" type="submit" className="w-full mt-2">
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
