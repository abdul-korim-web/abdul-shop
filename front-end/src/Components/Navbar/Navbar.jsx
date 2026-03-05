import React, { useContext, useRef, useState } from "react";
import { FiAlignCenter } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { AuthContex } from "./../../Auth/authContex";
import { Button } from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {
      item: "HOME",
      path: "/",
    },
    {
      item: "SHOP",
      path: "/shop",
    },
    // {
    //   item: "ABOUT",
    //   path: "/about",
    // },
    // {
    //   item: "CONTACT",
    //   path: "/contact",
    // },
    {
      item: "ORDER",
      path: "/order",
    },
  ];
const {userCart} = useContext(AuthContex)
  const [search, setSearch] = useState("");
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const phoneMenuButton = () => {
    setisOpenMenu(!isOpenMenu);
  };
  const { token } = useContext(AuthContex);
  //  navigation
  const navigate = useNavigate();

  return (
    <>
      <nav className="p-4 md:px-30  flex justify-between items-center border-b border-gray-400 gap-x-3 md:gap-x-7  sticky top-0   z-50 bg-transparent backdrop-blur-3xl ">
        <div className="w-[80px] md:w-[200px]">
          <img className="h-10 md:h-15" src="image/logo.png" alt="logo" />
        </div>
        <div className=" flex-1 relative ">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search your product"
            className="border border-gray-500 py-1 px-2 md:pt-2 rounded-2xl w-full focus:outline-blue-600"
          />
          {search ? (
            <IoMdClose
              onClick={() => setSearch("")}
              className="absolute top-2.5 right-4 cursor-pointer"
            />
          ) : (
            <IoIosSearch className="absolute top-2.5 right-4" />
          )}
        </div>
        <div className="md:flex hidden space-x-5 ">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item?.path}>
              {item?.item}
            </NavLink>
          ))}
        </div>
        <div className="flex space-x-3 justify-center items-center text-xl">
          {token ? (
            <>
              <MdAccountBox />
              <div className="relative">
                <button onClick={()=>navigate(`/mycart`)}>
                  <FaCartArrowDown />
                  <span className="absolute -top-4 -right-2 w-3.5 h-3.5">
                    {userCart?.length}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")} color="primary">
                Login
              </Button>
            </>
          )}
        </div>
        {/*  phone hambarger button  */}
        <div className="md:hidden">
          <button className="cursor-pointer" onClick={phoneMenuButton}>
            {isOpenMenu ? (
              <CgCloseR className=" text-2xl transition-all duration-300 hover:text-red-500" />
            ) : (
              <FiAlignCenter className="text-2xl transition-all duration-300 hover:text-blue-800" />
            )}
          </button>
        </div>
        {/* phone nav items */}
        <div
          className={`${
            isOpenMenu ? "absolute" : "hidden"
          } top-18 left-0  bg-white  shadow-2xl p-2 w-full z-50 `}
        >
          <ul className="flex flex-col space-y-3 md:hidden ">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="text-xl transition-all duration-300 hover:text-white hover:cursor-pointer hover:bg-blue-700 hover:rounded-2xl p-2"
              >
                <NavLink to={item?.path}>{item?.item}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
