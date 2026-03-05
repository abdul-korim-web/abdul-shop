import mongoose, { Types } from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: "unKnown",
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default:0
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Electronics",
      "Clothing",
      "Books",
      "Home Appliances",
      "Beauty",
      "Toys",
      "Sports",
      "Groceries",
      "others"
    ],
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  createBY: {
    type: Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  
},{timestamps:true});

const Product = mongoose.model("Product", productSchema);

export default Product;
