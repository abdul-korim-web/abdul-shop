import express from "express";
import createProductsControls from "../Controlers/products/createProducts.js";
import upload from "../Middelewares/upload.js";
import productinfoValidation from "../Middelewares/Products/productinfoValidation.js";
import { adminLoginCheck } from "../Middelewares/admin/adminLoginCheck.js";
import getProduct from "../Controlers/products/getProduct.js";
import GetSingleProduct from "../Controlers/products/GetSingleProduct.js";
import deleteProduct from "../Controlers/products/deleteProduct.js"
import userGetProduct from "../Controlers/products/user/userGetProduct.js";
import userGetSingleProducct from "../Controlers/products/user/userGetSingleProducct.js";
import userGetAllProduct from "../Controlers/products/user/userGetAllProduct.js";

const productRoute = express.Router();
// only admin 
//  create product 
productRoute.post(
  `/create`,
  adminLoginCheck,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  productinfoValidation,
  createProductsControls
);
//  get all product
productRoute.get(`/get`,adminLoginCheck,getProduct)
//  get single product 
productRoute.get(`/singleProduct/:adminId/:productId`,adminLoginCheck,GetSingleProduct)
//  delete single product
productRoute.delete("/delete",adminLoginCheck,deleteProduct )
export default productRoute;


//  only user  
//  get prodyct (limit 10)
productRoute.get(`/user/get`,userGetProduct)
//  get all product by user 
productRoute.get(`/usergetallproduct`, userGetAllProduct )
//  get single product (useing product id )
productRoute.get(`/:productId`,userGetSingleProducct)
