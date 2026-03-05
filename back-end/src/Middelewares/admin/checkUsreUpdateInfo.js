import { body } from "express-validator";
export const updateUserValidator = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
];
