import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

/**
 * Rejects requests with validation errors using the shared field-error shape.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express continuation.
 * @returns {void}
 * @throws {AppError} When validation errors are present.
 */
export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map((error) => ({
    field: "path" in error ? error.path : "request",
    message: error.msg,
  }));
  return next(new AppError(422, "Validation failed", errors));
}
