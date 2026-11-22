import { body } from "express-validator";

/**
 * Validates the body for creating a user message in a conversation.
 * @returns {import("express-validator").ValidationChain[]}
 */
export const createMessageValidator = [
  body("content")
    .isString().withMessage("Content must be text")
    .bail()
    .trim()
    .notEmpty().withMessage("Content is required"),
  body("conversation")
    .optional()
    .isMongoId().withMessage("Conversation must be a valid ID"),
];
