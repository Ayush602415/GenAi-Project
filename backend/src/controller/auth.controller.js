import { createUser, findUserByEmail, findUserByIdWithRefreshToken, updateRefreshToken, clearRefreshToken } from "../DAO/user.dao.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { env } from "../config/env.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth",
};

function toPublicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function issueTokens(user) {
  const identity = { id: user._id.toString(), email: user.email };
  return {
    accessToken: createAccessToken(identity),
    refreshToken: createRefreshToken(identity),
  };
}

/**
 * Registers a user and starts an authenticated session.
 * @type {import("express").RequestHandler}
 */
export const register = asyncHandler(async (req, res) => {
  const user = await createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const tokens = issueTokens(user);
  await updateRefreshToken(user._id.toString(), tokens.refreshToken);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  return sendSuccess(res, 201, "Account created successfully", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user),
  });
});

/**
 * Authenticates credentials and starts a session.
 * @type {import("express").RequestHandler}
 */
export const login = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.body.email, { includePassword: true });
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new AppError(401, "Invalid credentials");
  }
  const tokens = issueTokens(user);
  await updateRefreshToken(user._id.toString(), tokens.refreshToken);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  return sendSuccess(res, 200, "Login successful", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user),
  });
});

/**
 * Verifies and rotates the persisted refresh token.
 * @type {import("express").RequestHandler}
 */
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new AppError(401, "Invalid credentials");
  const payload = verifyRefreshToken(token);
  const user = await findUserByIdWithRefreshToken(payload.id);
  if (!user || user.refreshToken !== token) throw new AppError(401, "Invalid credentials");
  const tokens = issueTokens(user);
  await updateRefreshToken(user._id.toString(), tokens.refreshToken);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  return sendSuccess(res, 200, "Session refreshed", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user),
  });
});

/**
 * Invalidates the refresh token and clears the browser cookie.
 * @type {import("express").RequestHandler}
 */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    const payload = verifyRefreshToken(token);
    const user = await findUserByIdWithRefreshToken(payload.id);
    if (user?.refreshToken === token) await clearRefreshToken(user._id.toString());
  }
  res.clearCookie("refreshToken", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });
  return sendSuccess(res, 200, "Logged out successfully", {});
});

/**
 * Returns the authenticated user's public profile.
 * @type {import("express").RequestHandler}
 */
export const me = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "Profile loaded", { user: toPublicUser(req.user) });
});
