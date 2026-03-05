import { body } from "express-validator";

export const userRegisterInfoValidation = [
  body("username")
    .trim()
    .isString().withMessage("Username must be a string")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 15 }).withMessage("Username must be 3-15 characters"),

  body("email")
  .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is not valid"),

  body("password")
    .trim()
    .isString().withMessage("Password must be a string")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8, max: 20 }).withMessage("Password must be 8-20 characters")
];