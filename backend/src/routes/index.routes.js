import { Router } from "express";
import authRouter from "./auth.routes.js";
import { conversationRoutes } from "./conversation.routes.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/conversation",conversationRoutes)
/**
 * Creates the versioned API router.
 * @returns {Router}
 */
export function indexRoutes() {
  return router;
}

export default router;
