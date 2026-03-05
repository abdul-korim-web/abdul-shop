import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../../Models/adminSchema.js";
import { User } from "../../Models/userSchema.js";
// Admin register
export const adminRsgister = async (req, res, next) => {
  try {
    const validCheck = validationResult(req);
    if (!validCheck.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: validCheck?.errors[0].msg });
    }
    const { username, email, password } = req.body;
    const exitUser = await Admin.findOne({ email });
    if (exitUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already exit" });
    }
    const hashPassowrd = await bcrypt.hash(password, 10);
    const newUser = await Admin.create({
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
//  Admin  login
export const adminLogin = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: result?.errors[0]?.msg });
    }
    const { email, password } = req.body;
    //  valid email check
    const exitEmail = await Admin.findOne({ email });
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
    const token = await jwt.sign(
      { _id: exitEmail._id, username: exitEmail?.username, email },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "1h" }
    );

    // login success and send success responce
    res
      .status(200)
      .json({
        success: true,
        message: "Admin Login Successfully😍",
        token
      });
  } catch (error) {
    next(error);
  }
};
//  get admin info
export const admininfo = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const Admininfo = await Admin.findOne({ _id: _id });
    if (!Admininfo) {
      return res
        .status(400)
        .json({ success: false, message: "admin not exit" });
    }
    res
      .status(200)
      .json({ success: true, message: "admin info get success", Admininfo });
  } catch (error) {
    next(error);
  }
};
//  user delete  by adnin

export const userDelete = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const deleteUser = await User.findByIdAndDelete(user_id);
    if (!deleteUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "user delete successfully" });
  } catch (error) {
    next(error);
  }
};
//  get all user by admin
export const getUser = async (req, res, next) => {
  try {
    const Allusers = await User.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: "get all user successfully", Allusers });
  } catch (error) {
    next(error);
  }
};
//  change user info
export const UpdateUsrInfo = async (req, res, next) => {
  try {
    const infoValidResult = validationResult(req);
    if (!infoValidResult.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: infoValidResult?.errors[0].msg });
    }
    const { username, email, userId } = req.body;
    const updateUser = await User.findByIdAndUpdate(userId, {
      email,
      username,
    });
    if (!updateUser) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    res.status(200).json({success:true,message:"user update successfully😍"})
  } catch (error) {
    next(error);
  }
};
//  create new user by admin 
export const createUser = async (req, res, next) => {
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