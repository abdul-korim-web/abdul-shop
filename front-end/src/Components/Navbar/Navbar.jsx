import React, { useContext, useState } from "react";
import { FiAlignCenter } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { AuthContex } from "./../../Auth/authContex";
import { Button } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { item: "HOME", path: "/" },
    { item: "SHOP", path: "/shop" },
    { item: "ORDER", path: "/order" },
  ];

  const { userCart, token, logout } = useContext(AuthContex);

  const [search, setSearch] = useState("");
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const navigate = useNavigate();

  const phoneMenuButton = () => {
    setisOpenMenu(!isOpenMenu);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 md:px-30 flex justify-between items-center border-b border-gray-400 gap-x-3 md:gap-x-7 sticky top-0 z-50 bg-transparent backdrop-blur-3xl">

      {/* Logo */}
      <div className="w-[80px] md:w-[200px] ">
        <img className="h-10 md:h-15 rounded-[10000px] " src="image/logo.png" alt="logo" />
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search your product"
          className="border border-gray-500 py-1 px-3 md:py-2 rounded-2xl w-full focus:outline-blue-600"
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

      <div className="md:flex hidden space-x-5">
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.path}>
            {item.item}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        {token ? (
          <>
            <MdAccountBox className="text-2xl cursor-pointer" />

            <div className="relative">
              <button className="cursor-pointer" onClick={() => navigate("/mycart")}>
                <FaCartArrowDown className="text-2xl" />
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                  {userCart?.length}
                </span>
              </button>
            </div>

            <Button
              onClick={handleLogout}
              color="danger"
              size="sm"
              className="px-3 py-1 text-sm"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            color="primary"
            size="sm"
          >
            Login
          </Button>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={phoneMenuButton}>
          {isOpenMenu ? (
            <CgCloseR className="text-2xl hover:text-red-500" />
          ) : (
            <FiAlignCenter className="text-2xl hover:text-blue-800" />
          )}
        </button>
      </div>

      <div
        className={`${
          isOpenMenu ? "absolute" : "hidden"
        } top-16 left-0 bg-white shadow-2xl p-3 w-full z-50`}
      >
        <ul className="flex flex-col space-y-3 md:hidden">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="text-lg hover:text-white hover:bg-blue-700 rounded-xl p-2"
            >
              <NavLink to={item.path}>{item.item}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;