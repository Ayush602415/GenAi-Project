import AppError from "../utils/AppError.js";
import { env } from "../config/env.js";

/**
 * Converts operational and known database/token failures into the API envelope.
 * @param {Error} error Error supplied by Express.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express continuation.
 * @returns {void}
 */
export function errorMiddleware(error, req, res, next) {
  if (res.headersSent) return next(error);

  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern ?? error.keyValue ?? {})[0] ?? "email";
    statusCode = 409;
    message = "An account with this email already exists";
    errors = [{ field, message: "This value is already in use" }];
  } else if (error?.name === "CastError") {
    statusCode = 400;
    message = "Invalid request value";
    errors = [{ field: error.path ?? "id", message: "Invalid value" }];
  } else if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid credentials";
  } else {
    console.error("Unhandled request error:", error);
  }

  const response = { success: false, message, errors };
  if (env.nodeEnv !== "production") response.stack = error.stack;
  res.status(statusCode).json(response);
}
