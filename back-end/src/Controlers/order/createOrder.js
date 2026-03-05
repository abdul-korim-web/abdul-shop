import { validationResult } from "express-validator";
import Order from './../../Models/orderSchema.js';


const createOrder = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message:result?.errors[0].msg });
    }
    const {customerName,customerEmail,customerPhone,shippingAddress,subtotal,paymentMethod,orderProducts} =req.body
    if(!orderProducts?.length){
      return res.status(400).json({success:false,message:"order product are required"})
    }
    const finalOrderData = {customerName,customerEmail,customerPhone,shippingAddress,subtotal,paymentMethod,orderBy:req._id,orderProducts,paymentMethod:req?.body?.paymentMethod || "COD"}
    const newOrder=await Order.create(finalOrderData)
    res.status(200).json({success:true,message:"order create successfuly😍",newOrder})
  } catch (error) {
    next(error);
  }
};

// export
export default createOrder;
