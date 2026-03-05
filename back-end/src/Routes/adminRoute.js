import express from "express";
import {
  admininfo,
  adminLogin,
  adminRsgister,
  createUser,
  getUser,
  UpdateUsrInfo,
  userDelete,
} from "../Controlers/admin/adminControl.js";
import { userRegisterInfoValidation } from "../Middelewares/userRegisterInfoValidation.js";
import { checkLogin } from "../Middelewares/checkLogin.js";
import { adminLoginCheck } from "../Middelewares/admin/adminLoginCheck.js";
import { updateUserValidator } from "../Middelewares/admin/checkUsreUpdateInfo.js";
export const adminRoute = express.Router();

//  admin login
adminRoute.post(`/register`, userRegisterInfoValidation, adminRsgister);

// login admin
adminRoute.post(`/login`, adminLogin);
// get admin info
adminRoute.get("/", adminLoginCheck, admininfo);
// user delete (admin access)
adminRoute.delete(`/deleteUser`, adminLoginCheck, userDelete);
// get all user list
adminRoute.get("/getuser", adminLoginCheck, getUser);
// change  user info
adminRoute.patch(
  `/updateuser`,
  adminLoginCheck,
  updateUserValidator,
  UpdateUsrInfo
);
// create user by admin
adminRoute.post(`/createuser`,adminLoginCheck,userRegisterInfoValidation,createUser);
