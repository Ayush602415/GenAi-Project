/**
 * An operational API error with an HTTP status and optional field errors.
 */
export default class AppError extends Error {
  /**
   * @param {number} statusCode HTTP status code.
   * @param {string} message Safe client-facing message.
   * @param {Array<{ field: string, message: string }>} [errors] Field-level errors.
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
