import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { createMessageValidator } from "../validators/conversation.validator.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createConversationController } from "../controller/conversation.controller.js";


/**
 * Registers conversation endpoints.
 * @returns {Router}
 */
export function conversationRoutes() {
  const router = Router();
  router.post("/", requireAuth, createMessageValidator, validate , createConversationController);
  return router;
}

export default conversationRoutes()
