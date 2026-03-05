import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: {
    required: true,
    type: String,
  },
  customerEmail: {
    required: true,
    type: String,
  },
  customerPhone: {
    required: true,
    type: Number,
  },
  orderProducts: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        ref:"Product",
        required: true,
      },
      createBY:mongoose.Types.ObjectId,
      // ref:"Admin",
      productName: String,
      images:Array,
      price: Number,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  shippingAddress: {
    required:true,
    type: String
  },
  subtotal: {
    required:true,
    type:Number
  },
  paymentMethod: {
    type: String,
    default: "COD",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
},{ timestamps: true });
 const  Order = new mongoose.model("Order",orderSchema)
 export default Order