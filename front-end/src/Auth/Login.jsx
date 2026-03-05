import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "./authContex";
import axios from "axios";
import { user_api } from "../Config/SarverURL";
import {toast} from "react-toastify"
import { Button } from "@heroui/react";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading] = useState(false)
//    toast message 
  //  navigation
  const navigate = useNavigate();
  // user jwt   token
  const { token, setToken } = useContext(AuthContex);
  console.log(token);
  useEffect(() => {
  if (token) {
    navigate("/");
  }
}, [token, navigate]);
//  login function
const handelLogin = async(e)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const res =await axios.post(`${user_api}/login`,{email,password},{withCredentials:true})
        if (res?.data?.success) {
            toast.success(res?.data?.message)
            await localStorage.setItem("abdul_shop_token",res?.data?.token)
            setToken(res?.data?.token)
        } else{
            toast.error(res?.data?.message)

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    } finally{
        setLoading(false)
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Abdul Shop
        </h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        <form className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <Button type="submit" onClick={handelLogin}  className={`w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition ${loading ? "cursor-not-allowed" :"cursor-pointer"}`}>
           {loading? (<><ClipLoader size={20} color="white" /> Login...</>):(<>Login</>)}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/singup" className="text-indigo-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
