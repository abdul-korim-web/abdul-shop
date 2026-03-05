import Order from "../../Models/orderSchema.js";
import mongoose from "mongoose";

export const getOrder = async (req, res, next) => {
    // console.log(req._id);
    
const adminId = new mongoose.Types.ObjectId(req._id);
  try {
    const orders = await Order.aggregate([
      { $unwind: "$orderProducts" },

      {
        $match: {
          "orderProducts.createBY": adminId, 
        },
      },

      {
        $group: {
          _id: "$_id",
          orderBy: { $first: "$orderBy" },
          customerName: { $first: "$customerName" },
          customerEmail: { $first: "$customerEmail" },
          customerPhone: { $first: "$customerPhone" },
          subtotal: { $first: "$subtotal" },
          paymentMethod: { $first: "$paymentMethod" },
          orderStatus: { $first: "$orderStatus" },
          createdAt: { $first: "$createdAt" },
          shippingAddress: { $first: "$shippingAddress" },
          orderProducts: { $push: "$orderProducts" },
        },
      },

      { $sort: { createdAt: -1 } }, 
    ]);

    if (!orders.length) {
      return res.status(200).json({
        success: true,
        message: "No Order Found",
        totalOrder: 0,
        orderList: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "your order list found",
      totalOrder: orders.length,
      orderList: orders,
    });
  } catch (error) {
    next(error);
  }
};
