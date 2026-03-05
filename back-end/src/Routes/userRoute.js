import express from "express"
import { userInfoGet, userLogin, userRsgister } from "../Controlers/userControl.js"
import { userRegisterInfoValidation } from "../Middelewares/userRegisterInfoValidation.js"
import { loginInfoCheck } from "../Middelewares/userLoginInfoCheck.js"
import { checkLogin } from "../Middelewares/checkLogin.js"

export const userRoute= express.Router()


//  register user
userRoute.post(`/register`,userRegisterInfoValidation,userRsgister)

// login user  
userRoute.post(`/login`,loginInfoCheck,userLogin)

// user info 
userRoute.get(`/myinfo`,checkLogin,userInfoGet)