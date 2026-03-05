import { body } from "express-validator";

const productinfoValidation = [
  body("productName")
    .notEmpty().withMessage("product name is required")
    .isString().withMessage("product name must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("product name must be 3-100 characters"),

  body("brand")
    .notEmpty().withMessage("brand is required")
    .isString().withMessage("brand must be a string")
    .isLength({ min: 3, max: 40 })
    .withMessage("brand must be 3-40 characters"),

  body("price")
    .notEmpty().withMessage("price is required")
    .isNumeric().withMessage("price must be a number"),

  body("discount")
    .optional()
    .isNumeric().withMessage("discount must be a number"),

  body("category")
    .notEmpty().withMessage("category is required")
    .isString().withMessage("category must be a string")
    .isLength({ min: 3, max: 40 })
    .withMessage("category must be 3-40 characters"),
    body("isAvailable")
    .isBoolean().withMessage("isAvailable must be a Boolean value")
,
  body("description")
    .notEmpty().withMessage("description is required")
    .isString().withMessage("description must be a string")
    .isLength({ min:50 })
    .withMessage("description must be 50 characters"),
];

export default productinfoValidation;
