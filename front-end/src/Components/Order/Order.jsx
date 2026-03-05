import React, { useContext, useEffect, useState } from "react";
import  axios  from 'axios';
import { order_api } from './../../Config/SarverURL';
import { AuthContex } from './../../Auth/authContex';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Order = () => {
  const [userOrder,setUserOrder] = useState([])
  const {token} = useContext(AuthContex)
  const navigate = useNavigate()
  const getOrder = async()=>{
    try {
      const res = await axios.get(`${order_api}/user/get`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      if (res?.data?.success) {
        setUserOrder(res?.data?.orders)
        // toast.success(res?.data?.message)
      } else{
         toast.success(res?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(()=>{
    getOrder()
    
  },[])
  if (!userOrder.length) {
    return(
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
       <img  src="image/order/not-found.jpg" alt="order not found" />
      </div>
    )
    
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {userOrder.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6 border"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {order.createdAt}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  order.orderStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.orderStatus === "confirmed"
                    ? "bg-blue-100 text-blue-700"
                    : order.orderStatus === "shipped"
                    ? "bg-purple-100 text-purple-700"
                    : order.orderStatus === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">
                  Total: ৳{order.subtotal}
                </p>
                <p className="text-sm text-gray-500">
                  Payment: {order.paymentMethod}
                </p>
              </div>

              <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:opacity-80 transition cursor-pointer" onClick={()=>{
                navigate(`/order/${order._id}`)
              }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
