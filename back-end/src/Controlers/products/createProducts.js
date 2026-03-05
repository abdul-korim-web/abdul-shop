import { v2 as cloudinary } from "cloudinary";
import { validationResult } from "express-validator";
import Product from "../../Models/ProductSchema.js";
import fs from "fs"

const createProductsControls = async (req, res, next) => {

  const validCheck = validationResult(req);
  if (!validCheck.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: validCheck?.errors[0].msg });
  }
  // image not send responce 
  if (!req?.files?.image1 && !req?.files?.image2 && !req?.files?.image3) {
    return res.status(400).json({success:false,message:"please upload image"})
    
  }
  const image1 = req?.files?.image1 && req?.files?.image1[0]
  const image2 = req?.files?.image2 && req?.files?.image2[0]
  const image3  = req?.files?.image3 && req?.files?.image3[0]
  const imagesArray =[image1,image2,image3].filter(Boolean)
  const uploadImage = await Promise.all(
    imagesArray.map(async(item)=>{
      const result = await cloudinary.uploader.upload(item?.path,{
        folder:"products"
      })
      // deelte image in backend upoload folder 
      fs.unlinkSync(item?.path)
      return result?.secure_url
    })
  )

  const {
    productName,
    brand,
    price,
    discount,
    category,
    isAvailable,
    description,
  } = req.body;
  const createBY = req._id;
  // final product object 
  const finalProductData = {
    productName,
    brand,
    price,
    discount,
    category,
    isAvailable,
    description,
    createBY,
    images:uploadImage,
  };
  const newProduct =await Product.create(finalProductData);
  res
    .status(200)
    .json({ success: true, message: "product create successfully" });
};
console.log("product add successfully");

export default createProductsControls;
