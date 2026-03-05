import { body } from "express-validator";

export const createOrderInfoCheck = [

  body("customerName")
    .notEmpty().withMessage("Customer name is required")
    .isString().withMessage("Customer name must be string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Customer name must be 3-30 characters"),

  body("customerEmail")
    .notEmpty().withMessage("Customer email is required")
    .isEmail().withMessage("Invalid email address"),

  body("customerPhone")
    .notEmpty().withMessage("Customer phone is required")
    .isString().withMessage("Phone must be string")
    .matches(/^(?:\+8801|01)[3-9]\d{8}$/)
    .withMessage("Invalid Bangladeshi phone number"),

  
  body("shippingAddress")
    .notEmpty().withMessage("Shipping address is required")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be 10-200 characters"),

  body("subtotal")
    .notEmpty().withMessage("Subtotal is required")
    .isNumeric().withMessage("Subtotal must be number"),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "ONLINE"])
    .withMessage("Invalid payment method"),
];
