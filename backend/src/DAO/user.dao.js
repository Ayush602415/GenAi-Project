import UserModel from "../models/user.model.js";

/**
 * Creates and persists a user.
 * @param {{ name: string, email: string, password: string }} input User registration fields.
 * @returns {Promise<import("mongoose").HydratedDocument<object>>}
 */
export async function createUser(input) {
  return UserModel.create(input);
}

/**
 * Finds a user by normalized email, including credential fields when requested.
 * @param {string} email Normalized email address.
 * @param {{ includePassword?: boolean, includeRefreshToken?: boolean }} [options] Credential selection options.
 * @returns {Promise<import("mongoose").HydratedDocument<object> | null>}
 */
export async function findUserByEmail(email, options = {}) {
  let query = UserModel.findOne({ email: email.toLowerCase() });
  if (options.includePassword) query = query.select("+password");
  if (options.includeRefreshToken) query = query.select("+refreshToken");
  return query.exec();
}

/**
 * Finds a user by id.
 * @param {string} id User identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<object> | null>}
 */
export async function findUserById(id) {
  return UserModel.findById(id).exec();
}

/**
 * Finds a user and explicitly selects its persisted refresh token.
 * @param {string} id User identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<object> | null>}
 */
export async function findUserByIdWithRefreshToken(id) {
  return UserModel.findById(id).select("+refreshToken").exec();
}

/**
 * Stores the current rotating refresh token.
 * @param {string} id User identifier.
 * @param {string} refreshToken New refresh token.
 * @returns {Promise<import("mongoose").HydratedDocument<object> | null>}
 */
export async function updateRefreshToken(id, refreshToken) {
  return UserModel.findByIdAndUpdate(id, { refreshToken }, { new: true }).select("+refreshToken").exec();
}

/**
 * Invalidates a user's persisted refresh token.
 * @param {string} id User identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<object> | null>}
 */
export async function clearRefreshToken(id) {
  return UserModel.findByIdAndUpdate(id, { refreshToken: null }, { new: true }).select("+refreshToken").exec();
}
