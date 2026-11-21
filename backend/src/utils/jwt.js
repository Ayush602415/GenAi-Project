import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";

/**
 * Creates a short-lived access token.
 * @param {{ id: string, email: string }} payload Token identity.
 * @returns {string}
 */
export function createAccessToken(payload) {
  return jwt.sign(payload, env.accessTokenSecret, { expiresIn: "15m", jwtid: randomUUID() });
}

/**
 * Creates a seven-day refresh token.
 * @param {{ id: string, email: string }} payload Token identity.
 * @returns {string}
 */
export function createRefreshToken(payload) {
  return jwt.sign(payload, env.refreshTokenSecret, { expiresIn: "7d", jwtid: randomUUID() });
}

/**
 * Verifies a refresh token and returns its identity.
 * @param {string} token Signed refresh token.
 * @returns {{ id: string, email: string }}
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.refreshTokenSecret);
}

/**
 * Verifies an access token and returns its identity.
 * @param {string} token Signed access token.
 * @returns {{ id: string, email: string }}
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, env.accessTokenSecret);
}
