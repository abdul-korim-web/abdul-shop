import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import {toast} from "react-toastify"
import { AiOutlineClose } from "react-icons/ai";
import { AuthContex } from "../Auth/authContex";
import axios from "axios";
import { order_api } from "../Config/SarverURL";

export default function CheckoutModal({ isOpen, onOpenChange, userCart = [], subtotal = 0 }) {
   const {userInfo} = useContext(AuthContex)
   const {token} = useContext(AuthContex)

  //   order cart data state 
  const [customerPhone,setCustomerPhone] = useState()
  const [shippingAddress,setShippingAddress] = useState("")
  const [userNote,setUserNote] = useState("")
  // order function 
  const newOrderhandeler= async()=>{
    try {
     console.log(userCart);
      const res= await axios.post(`${order_api}/buy`,{customerName:userInfo?.username,customerEmail:userInfo?.email,customerPhone,shippingAddress,orderProducts:userCart,subtotal},{withCredentials:true,headers:{Authorization:`Berar ${token}`}})
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        
      } else{
        toast.error(res?.data?.message)

      }
    } catch (error) {
       toast.error(error?.response?.data?.message)
        
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="lg">
      <ModalContent>
        {(onClose) => (
          <>
  
            <ModalHeader className="flex justify-between items-center">
              <h3 className="text-xl font-bold">🛒 Checkout</h3>
            </ModalHeader>


            <ModalBody className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

              {userCart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty 😒</p>
              ) : (
                <div className="space-y-3">
                  {userCart.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 border rounded-lg p-3">
                      <img
                        src={item?.images?.[0]}
                        alt={item?.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item?.productName}</p>
                        <p className="text-xs text-gray-500">Qty: {item?.quantity || 1}</p>
                      </div>
                      <div className="font-semibold text-blue-600">
                        ৳ {(item?.price - item?.discount) * (item?.quantity || 1)}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between text-base font-bold pt-2 border-t mt-2">
                    <span>Subtotal</span>
                    <span>৳ {subtotal}</span>
                  </div>
                </div>
              )}
              <div className="mt-4 space-y-3">
                <Input label="Full Name" placeholder="Enter your full name" variant="bordered" disabled value={userInfo?.username}  />
                <Input label="Email" placeholder="Enter your email" variant="bordered" value={userInfo?.email} />
                <Input value={customerPhone} onChange={(e)=>setCustomerPhone(e.target.value)} label="Phone Number" placeholder="Enter your phone number" variant="bordered"  />
                <Textarea value={shippingAddress} onChange={(e)=>setShippingAddress(e.target.value)} label="Address" placeholder="Enter your address" variant="bordered" />
                <Textarea value={userNote} onChange={(e)=>setUserNote(e.target.value)} label="Notes (Optional)" placeholder="Any special instructions?" variant="bordered" />
              </div>
            </ModalBody>

            <ModalFooter className="flex flex-col sm:flex-row gap-2 justify-end">
              <Button variant="flat" color="danger" onPress={onClose} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={newOrderhandeler} color="primary" className="w-full sm:w-auto">
                Confirm Order
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
  