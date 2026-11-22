import { ChatIcon } from "./ChatIcon.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function initials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "Y"
  );
}

export function ChatThread({ messages, user, isSending }) {
  const firstName = user?.name?.trim().split(/\s+/)[0] || "You";

  return (
    <div className="message-thread">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const content = message.content || "";
        return (
          <article
            key={message.id || message._id || `${message.role}-${index}`}
            className={`message-row ${isUser ? "user-message" : "assistant-message"}`}
          >
            <div
              className={`message-avatar ${isUser ? "user-message-avatar" : "assistant-message-avatar"}`}
            >
              {isUser ? (
                initials(user?.name)
              ) : (
                <ChatIcon name="sparkle" className="h-[18px] w-[18px]" />
              )}
            </div>
            <div className="message-body">
              <div className="message-author">
                {isUser ? firstName : "Downbot"}
              </div>
              <div className="message-content">
                {content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                ) : isSending && !isUser ? (
                  <span className="typing-indicator">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
