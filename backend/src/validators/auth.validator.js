import { body } from "express-validator";

/**
 * Validates registration fields.
 * @returns {import("express-validator").ValidationChain[]}
 */
export const registerValidator = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Za-z]/).withMessage("Password must contain a letter")
    .matches(/\d/).withMessage("Password must contain a number"),
];

/**
 * Validates login fields without disclosing which credential is incorrect.
 * @returns {import("express-validator").ValidationChain[]}
 */
export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").notEmpty().withMessage("Email and password are required"),
];
