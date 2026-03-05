import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoAddCircle } from "react-icons/io5";
import { FaListAlt } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import "./Sitebar.css"

const Sitebar = () => {
    const siteItems = [
        {
            icon:<IoAddCircle/>,
            title:"Add Items",
            path:"/additem"
        },
        {
            icon:<FaListAlt/>,
            title:"Product List",
             path:"/productlist"
        },
        {
            icon:<FaBorderAll/>,
            title:"Order",
             path:"/order"
        },
        {
            icon:<FaUserGroup/>,
            title:"User List",
             path:"/userlist"
        }
    ]
    return (
        <div >
           {
            siteItems.map((item,index)=>(
                <NavLink key={index} className="flex bg-gray-200 mt-3 px-5 py-3 md:ml-5 rounded-xl shadow items-center space-x-3 text-xl hover:bg-black/80 hover:text-white hover:transition-all hover:duration-300" to={item?.path}>
                    <span >
                        {item?.icon}
                    </span>
                    <p className='hidden md:flex'>{item?.title}</p>
                </NavLink>
            ))
           }
        </div>
    );
}

export default Sitebar;
