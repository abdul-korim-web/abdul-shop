import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Button from "@mui/material/Button";

const Footer = () => {
  const socialLink = [
    {
      icon: <FaGithub />,
      to: "https://github.com/abdul-korim-web",
    },
    {
      icon: <FaYoutube />,
      to: "https://github.com/abdul-korim-web",
    },
    {
      icon: <FaFacebook />,
      to: "https://github.com/abdul-korim-web",
    },
    {
      icon: <FaLinkedin />,
      to: "https://github.com/abdul-korim-web",
    },
    {
      icon: <MdEmail />,
      to: "https://github.com/abdul-korim-web",
    },
  ];
  // list shopAccout
  const shopAccount = [
    {
      title: "Shop",
      item: [
        {
          name: "Accesories",
          to: "",
        },
        {
          name: "Clothes",
          to: "",
        },
        {
          name: "Electronics",
          to: "",
        },
        {
          name: "Home appliances",
          to: "",
        },
        {
          name: "New Arrivals",
          to: "",
        },
      ],
    },
    {
      title: "Your account",
      item: [
        {
          name: "Profile",
          to: "",
        },
        {
          name: "Orders",
          to: "",
        },
        {
          name: "Addresses",
          to: "",
        },
        {
          name: "Account Details",
          to: "",
        },
        {
          name: "Payment Options",
          to: "",
        },
      ],
    },
  ];
  return (
    <footer className="flex flex-wrap justify-around space-y-10 p-10 bg-black text-white">
      <div className="flex flex-col space-y-5">
        <h2 className="font-bold text-2xl">More About Abdul Korim Shop</h2>
        <p className="text-sm w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea molestias
          illo ab, nihil cumque unde.
        </p>
        <div>
          <ul className="flex  space-x-5">
            {socialLink.map((item, index) => (
              <li key={index}>
                <a href={item?.to} className="text-xl hover:text-gray-200 ">{item?.icon}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* footer Lict  */}
      {shopAccount.map((item, index) => (
        <div key={index} className="flex flex-col space-y-5">
          <div ><h2 className="text-2xl font-bold">{item?.title}</h2></div>
          <div>
            <ul className="flex flex-col space-y-2 text-sm">
              {item.item.map((itemList, index) => (
                <li key={index} className="text-white transition-all duration-300 hover:text-gray-200 hover:text-xl">
                  <a href={itemList?.to}>{itemList?.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {/* Subscribe to our newsletter. div */}
      <div className="flex flex-col space-y-5">
        <h2 className="text-2xl font-bold">Subscribe to our newsletter.</h2>
        <p className="text-center w-[80%] ">A at pellentesque et mattis porta enim elementum.</p>
        <div className="flex flex-wrap space-x-5 space-y-3 justify-center items-center">
            <input type="text" className="border-b-2 border-gray-600 px-3 py-2 focus:outline-none focus:border-gray-800"  />
            <Button variant="contained" sx={{backgroundColor:"#242320", borderRadius:"10px", padding:"10px 20px"}}>Subscribe</Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
