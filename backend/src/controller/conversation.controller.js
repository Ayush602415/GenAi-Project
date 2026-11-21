import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { env } from "../config/env.js";
import { generateTitle } from "../services/ai/title.model.services.js";
import {
  createConversation,
  findConversationByIdForUser,
} from "../DAO/conversation.dao.js";
import model from "../services/ai/main.model.js";
import { createMessage, getMessagesByConversation } from "../DAO/message.dao.js";
import { AIMessage, HumanMessage } from "langchain";

export async function createConversationController(req, res, next) {
  const { content, conversation: conversationId } = req.body;
  const user = req.user;
  let conversation = null;
  if (!conversationId) {
    const { title } = await generateTitle(content);
    conversation = await createConversation({ user: user.id, title });
  } else {
    conversation = await findConversationByIdForUser(conversationId, user.id);
    if (!conversation) {
      return next(new AppError(404, "Conversation not found"));
    }
  }
  const messages = (await getMessagesByConversation(conversation.id))
    .map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role === "assistant") {
        return new AIMessage(msg.content);
      } else {
        return null;
      }
    })
    .filter(Boolean);

  messages.push(new HumanMessage(content));

  await createMessage({
    role: "user",
    conversation: conversation._id,
    content: content
  })

  const stream = await model.stream(messages);
 //Server Sent Events (SSE) Headers
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  res.write(`data: ${JSON.stringify({
    conversationId: conversation.id,
    title: conversation.title
  })}\n\n`)

  let aiChunk = null;
  for await (const chunk of stream) {
    if (aiChunk == null) {
      aiChunk = chunk;
    } else {
      aiChunk = aiChunk.concat(chunk);
    }
    res.write(`data: ${JSON.stringify({chunk: chunk.content})}\n\n`)
  }
  res.end()

  await createMessage({
    role: "assistant",
    conversation: conversation._id,
    content: content
  })
}



