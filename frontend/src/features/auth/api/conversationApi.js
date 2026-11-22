import { authClient, getAccessToken } from "./authApi.js";

export async function getConversations() {
  const { data } = await authClient.get("/conversation");
  return data.data.conversation;
}

export async function getConversationMessages(conversationId) {
  const { data } = await authClient.get(
    `/conversation/messages/${encodeURIComponent(conversationId)}`,
  );
  return data.data.messages;
}

export async function streamConversationMessage({
  content,
  conversationId,
  onConversation,
  onChunk,
  signal,
}) {
  const token = getAccessToken();
  const response = await fetch(`${authClient.defaults.baseURL}/conversation`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      content,
      ...(conversationId ? { conversation: conversationId } : {}),
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Conversation request failed (${response.status}).`);
  }

  if (!response.body) {
    throw new Error("The conversation response stream is unavailable.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  function processEvent(block) {
    const lines = block.split(/\r?\n/);
    const eventName = lines.find((line) => line.startsWith("event:"))?.slice(6).trim();
    const data = lines
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data) return;

    const eventData = JSON.parse(data);
    if (eventName === "error") {
      throw new Error(eventData.message || "The assistant could not finish this response.");
    }
    if (eventData.conversationId) onConversation?.(eventData);
    if (typeof eventData.chunk === "string") onChunk?.(eventData.chunk);
  }

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = blocks.pop() || "";
    for (const block of blocks) processEvent(block);
    if (done) break;
  }
  if (buffer.trim()) processEvent(buffer);
}