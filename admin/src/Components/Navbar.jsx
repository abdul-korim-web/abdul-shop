import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { admin,setAdmin,setToken } = useContext(AuthContext);
  //  logout admin button 
  const handelLogout = ()=>{
    localStorage.removeItem("abdul_shop_admin_token")
    toast.success("Logout success")
    setAdmin(null)
    setToken(null)
  }

  return (
    <div className="flex px-5 md:px-20 py-5 border-b-2 border-gray-200 justify-between items-center sticky top-0 bg-white z-100">
      <div className="flex flex-col items-center">
        <img
          className="h-8 md:h-15 cursor-pointer"
          src="logo.png"
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <p className="text-gray-600 text-sm md:text-xl">Orebe Admin panel</p>
      </div>
      <div className=" flex justify-center items-center">
        {admin?(
          <>
          <span className="mr-2 md:mr-3 text-sm md:text-xl font-bold italic font-mono ">Hi <span className="text-blue-800">{admin.username}</span></span>
          <Button
          onClick={handelLogout}
          variant="contained"
          sx={{ backgroundColor: "black", borderRadius: "10px" }}
        >
          Logout
        </Button>
          </>
        ):(
          <>
          <Button
          variant="contained"
          sx={{ backgroundColor: "black", borderRadius: "10px" }}
          onClick={()=>navigate(`/login`)}
        >
          Login
        </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
