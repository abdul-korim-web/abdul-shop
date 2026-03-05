import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "../Models/userSchema.js";
// user register
export const userRsgister = async (req, res, next) => {
  try {
    const validCheck = validationResult(req);
    if (!validCheck.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: validCheck?.errors[0].msg });
    }
    const { username, email, password } = req.body;
    const exitUser = await User.findOne({ email });
    if (exitUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already exit" });
    }
    const hashPassowrd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassowrd,
    });
    res
      .status(200)
      .json({ success: true, message: "registation successfully😍" });
  } catch (error) {
    next(error);
  }
};
//  user login
export const userLogin = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: result?.errors[0]?.msg });
    }
    const { email, password } = req.body;
    //  valid email check
    const exitEmail = await User.findOne({email});
    if (!exitEmail) {
      return res
        .status(400)
        .json({ success: false, message: "email is not exit" });
    }
    const isValidPassword = await bcrypt.compare(password, exitEmail.password);
    if (!isValidPassword) {
      res
        .status(400)
        .json({ success: false, message: "password is not valid" });
    }
    const token = await jwt.sign({_id:exitEmail._id,username:exitEmail?.username,email},process.env.JWT_SECRET,{expiresIn:"1h"})

    // login success and send success responce 
    res.status(200).json({success:true,message:"User Login Successfully😍",token})
  } catch (error) {
    next(error);
  }
};
// get user info 
export const userInfoGet=async(req,res,next)=>{
  try {
    const {_id}= req
    const userInfo = await User.findById(_id).select(`-password`)
    if (!userInfo) {
      return res.status(400).json({success:false,message:"User Not Found"})
      
    }
    res.status(200).json({success:true,message:"User Info Found",userInfo})

  } catch (error) {
    next(error)
  }
}