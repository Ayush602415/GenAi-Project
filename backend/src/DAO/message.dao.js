import MessageModel from "../models/message.model.js";

/**
 * Creates and persists a message.
 * @param {{ conversation: string, role: "system"|"user"|"assistant", content: string }} input Message fields.
 * @returns {Promise<import("mongoose").HydratedDocument<object>>}
 */
export async function createMessage(input) {
  return MessageModel.create(input);
}

/**
 * Gets messages for a conversation in chronological order.
 * @param {string} conversationId Conversation identifier.
 * @returns {Promise<Array<import("mongoose").HydratedDocument<object>>>}
 */
export async function getMessagesByConversation(conversationId) {
  return MessageModel.find({ conversation: conversationId }).sort({ createdAt: 1 });
}
