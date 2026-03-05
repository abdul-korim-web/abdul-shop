import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { databaseConnection } from "./src/Config/db.js"
import { userRoute } from "./src/Routes/userRoute.js"
import { adminRoute } from "./src/Routes/adminRoute.js"
import productRoute from "./src/Routes/productRoute.js"
import connectCloudnary from "./src/Config/cloudinary.js"
import {orderRoute} from "./src/Routes/orderRoute.js"
//  app init  
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    origin:["https://abdul-shop-frontend.vercel.app","https://abdul-shop-admin.vercel.app/"],
    credentials:true
}))

//  database connection 
databaseConnection()
// cloudinary connecttion 
connectCloudnary()
// get home page 
app.get(`/`,(req,res)=>{
    res.status(200).json({success:true,message:"welcome to Abdul Shop Backend server"})
})
//  user route 
app.use(`/user`,userRoute)
//  admin route 
app.use(`/admin`,adminRoute)
//  product Route 
app.use("/product",productRoute)
//  order route 
app.use(`/order`,orderRoute)
// error handeling 
app.use((err,req,res,next)=>{
    console.log(err?.message || err);
    res.status(400).json({success:false,message:"This is a server site error.Please Contact with Developer "})
    next(err?.message || err)
})
//  listing port 
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`abdul korim shop backend server running `);
    console.log(`this backend make by Abdul Korim`);
})