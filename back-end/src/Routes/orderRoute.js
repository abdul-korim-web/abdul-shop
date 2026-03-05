import express from "express"
import createOrder from "../Controlers/order/createOrder.js"
import { checkLogin } from './../Middelewares/checkLogin.js';
import { createOrderInfoCheck } from "../Middelewares/order/createOrderInfoCheck.js";
import { adminLoginCheck } from './../Middelewares/admin/adminLoginCheck.js';
import { getOrder } from "../Controlers/order/getOrder.js";
import orderStatusChenge from "../Controlers/order/orderStatusChenge.js";
import userGetOrder from "../Controlers/order/user/userGetOrder.js";
import getSingleOrder from "../Controlers/order/user/getSingleOrder.js";

export const orderRoute = express.Router()
//  create a order ( user )
orderRoute.post(`/buy`,checkLogin,createOrderInfoCheck,createOrder)
//  get order list(admin)
orderRoute.get(`/get`,adminLoginCheck,getOrder);
// edit order status (admin)
orderRoute.patch(`/status/:productId`,adminLoginCheck,orderStatusChenge)
// get all target user order (user )
export default userGetOrder
orderRoute.get(`/user/get`,checkLogin,userGetOrder)
// get single product (user)
orderRoute.get(`/user/get/:orderId`,checkLogin,getSingleOrder)







