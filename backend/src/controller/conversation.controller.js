import { AIMessage, createAgent, HumanMessage, SystemMessage } from "langchain";
import {
  createConversation,
  findConversationByIdForUser,
  findConversationByUser,
} from "../DAO/conversation.dao.js";
import {
  createMessage,
  getMessagesByConversation as getConversationMessages,
} from "../DAO/message.dao.js";
import AppError from "../utils/AppError.js";
import model from "../services/ai/main.model.js";
import { generateTitle } from "../services/ai/title.model.services.js";
import { sendSuccess } from "../utils/apiResponse.js";
import {MCPAdapter} from "@langchain/mcp-adapters"
import { env } from "../config/env.js";

const adapter = new MCPAdapter({
    servers:{
      tavily:{
        url: env.TAVILY_API_KEY
      }
    }
})

const tools = await adapter.listTools()

export async function createConversationController(req, res, next) {
  const { content, conversation: conversationId } = req.body;
  const user = req.user;
  let conversation;
  if (!conversationId) {
    const { title } = await generateTitle(content);
    conversation = await createConversation({ user: user.id, title });
  } else {
    conversation = await findConversationByIdForUser(conversationId, user.id);
    if (!conversation) {
      return next(new AppError(404, "Conversation not found"));
    }
  }
  const messages = (await getConversationMessages(conversation.id))
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
    content: content,
  });

  // Server Sent Events (SSE) Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(
    `data: ${JSON.stringify({ conversationId: conversation.id, title: conversation.title })}\n\n`,
  );

  let responseContent = "";

  try {
    const agent = createAgent({model,tools})

    const stream = await agent.stream({
      messages: [new SystemMessage(`- Your name is downbot`),...messages]
    },
  {
    streamMode: "messages"
  });

    for await (const [chunk] of stream) {
      responseContent += chunk.content;
      res.write(`data: ${JSON.stringify({ chunk: chunk.content })}\n\n`);
    }

    await createMessage({
      role: "assistant",
      conversation: conversation._id,
      content: responseContent,
    });

    res.end();
  } catch (error) {
    console.error("Conversation response stream failed:", error);
    const message = error?.status === 401 || /invalid api key|expired_api_key/i.test(error?.message ?? "")
      ? "The AI provider rejected GROQ_API_KEY. Update it in backend/.env and restart the API."
      : "Failed to generate a response. Please try again.";
    res.write(
      `event: error\ndata: ${JSON.stringify({
        success: false,
        message,
      })}\n\n`,
    );
    res.end();
  }
}

export async function getAllConversations(req, res) {
  const user = req.user;
  const conversation = await findConversationByUser(user.id);
  return sendSuccess(res, 200, "Conversation fetched successfully", {
    conversation,
  });
}

export async function getMessagesByConversation(req, res, next) {
  const { conversationId } = req.params;
  const user = req.user;
  const conversation = await findConversationByIdForUser(
    conversationId,
    user.id,
  );
  if (!conversation) {
    return next(new AppError(404, "Conversation not found"));
  }
  const messages = await getConversationMessages(conversation.id);
  return sendSuccess(res, 200, "Messages fetched successfully", { messages });
}
