import React, { useContext, useEffect, useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { AuthContex } from "../Auth/authContex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BuyNowModal from "./BuyNowModal";

const FullPageCart = () => {
  const navigate = useNavigate();
  const { userCart, setUserCart, token } = useContext(AuthContex);
  const { onOpen, onOpenChange,isOpen} = useDisclosure();
  
  // check login 
  useEffect(() => {
    if (!token) {
     toast.error("Please Login First")
      navigate(`/login`);
    }
  }, [token]);
  // increase quantity
  const incrimentQuantity =(id)=>{
    setUserCart((prev)=>(
      prev?.map((item)=>(
        item._id===id ? {...item,quantity:(item.quantity || 1)+1}:item
      ))
    ))
  }
  // decrement quantity
  const decrementQuantity = (id)=>{
    setUserCart((prev)=>(
      prev?.map((item)=>(
        item?._id === id ? {...item,quantity:item?.quantity>1 ? item?.quantity-1 :1}:item
      ))
    ))
  } 
  //  remove product 
  const removeProduct = (id)=>{
    setUserCart((prev)=>(
      prev?.filter((item)=>item?._id !== id)
    ))
  }
  //  subtotal
  const subtotal = userCart.reduce((total,item)=>{
    const price = item?.price- item?.discount
    const quantity  = item?.quantity || 1
    return total+ (price*quantity)
  },0)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">🛒 My Cart</h2>
          <span className="text-gray-500 text-sm">
            Total Items: {userCart.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {userCart.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-20">
              Your cart is empty 😒
            </div>
          ) : (
            userCart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 border rounded-xl p-4"
              >
                <img
                  src={item?.images?.[0]}
                  alt={item?.productName}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {item?.productName}
                    </h3>
                    <p className="text-gray-500 text-sm">{item?.brand}</p>
                    <div className="flex gap-2 items-center mt-2">
                      <span className="font-bold text-blue-600">
                        ৳ {item?.price - item?.discount}
                      </span>
                      {item?.discount > 0 && (
                        <span className="line-through text-gray-400 text-sm">
                          ৳ {item?.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                      <button onClick={()=>decrementQuantity(item?._id)} className="text-gray-600 cursor-pointer">
                        <AiOutlineMinus size={16} />
                      </button>
                      <span className="text-sm font-medium">{item?.quantity|| 1}</span>
                      <button onClick={()=>incrimentQuantity(item?._id) } className="text-gray-600 cursor-pointer">
                        <AiOutlinePlus size={16} />
                      </button>
                    </div>

                    <button onClick={()=>removeProduct(item?._id)} className="text-red-500 cursor-pointer">
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-lg font-semibold">Subtotal: ৳ {subtotal}</div>
          <Button isDisabled={!userCart?.length} className={`bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto ${!userCart?.length ? "cursor-not-allowed":"cursor-pointer" }`} onClick={onOpen}>
            Buy Now
          </Button>
          <BuyNowModal isOpen={isOpen} onOpenChange={onOpenChange} userCart={userCart} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default FullPageCart;
