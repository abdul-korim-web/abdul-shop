import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContex } from "./authContex";
import { toast } from "react-toastify";
import axios from "axios";
import { user_api } from "../Config/SarverURL";
import { ClipLoader } from "react-spinners";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false)
  //   navigate
  const navigate = useNavigate();
  // user jwt   token
  const { token, setToken } = useContext(AuthContex);
  console.log(token);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  //  handel singup user
  const handelSingup = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return toast.warning("comfrom password don`t match");
    }
    try {
      setLoading(true)
      const res = await axios.post(`${user_api}/register`,{username,email,password},{withCredentials:true})
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setUsername("")
        setEmail("");
        setPassword("")
        setConfirmPassword("")
        navigate(`/login`)
        
      } else{
         toast.error(res?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">Join Abdul Shop today</p>

        <form className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}

          <button
          type="submit"
            onClick={handelSingup}
            className={`w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition ${loading ? "cursor-not-allowed" :"cursor-pointer"}`}
          >
          {loading? (<><ClipLoader size={20} color="white" /> sing up...</>):(<>sing up</>)}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
