/**
 * Forwards asynchronous route-handler rejections to Express error middleware.
 * @param {import("express").RequestHandler} handler Express handler.
 * @returns {import("express").RequestHandler}
 */
export function asyncHandler(handler) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
