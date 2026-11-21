import AppError from "../utils/AppError.js";

/**
 * Forwards unmatched routes to centralized error handling.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Express continuation.
 * @returns {void}
 */
export function notFound(req, res, next) {
  next(new AppError(404, "Route not found"));
}
