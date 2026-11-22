import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { createMessageValidator } from "../validators/conversation.validator.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createConversationController, getAllConversations, getMessagesByConversation } from "../controller/conversation.controller.js";


/**
 * Registers conversation endpoints.
 * @returns {Router}
 */
export function conversationRoutes() {
  const router = Router();
  router.post("/", requireAuth, createMessageValidator, validate, asyncHandler(createConversationController));
  router.get("/", requireAuth, asyncHandler(getAllConversations));
  router.get("/messages/:conversationId", requireAuth, asyncHandler(getMessagesByConversation));
  return router;
}

