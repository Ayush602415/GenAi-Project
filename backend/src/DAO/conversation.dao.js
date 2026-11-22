import ConversationModel from "../models/conversation.model.js";

/**
 * Creates and persists a conversation.
 * @param {{ user: string, title?: string }} input Conversation fields.
 * @returns {Promise<import("mongoose").HydratedDocument<object>>}
 */
export async function createConversation(input) {
  return ConversationModel.create(input);
}

/**
 * Finds a conversation owned by a specific user.
 * @param {string} id Conversation identifier.
 * @param {string} userId User identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<object> | null>}
 */
export async function findConversationByIdForUser(id, userId) {
  return ConversationModel.findOne({ _id: id, user: userId })
}

/**
 * Finds a conversation owned by a specific user.
 * @param {string} id Conversation identifier.
 * @param {string} userId User identifier.
 */

export async function findConversationByUser(userId){
  return ConversationModel.find({user: userId})
}
