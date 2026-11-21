import { findUserById } from "../DAO/user.dao.js";
import { verifyAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Authenticates a bearer access token and attaches its public user document.
 * @type {import("express").RequestHandler}
 */
export const requireAuth = asyncHandler(async (req, res, next) => {
  const authorization = req.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) throw new AppError(401, "Invalid credentials");
  const payload = verifyAccessToken(authorization.slice(7));
  req.user = payload;
  next();
});
