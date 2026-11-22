import { BrandMark } from "../../auth/ui/BrandMark.jsx";
import { ChatIcon, UserAvatar } from "./ChatIcon.jsx";

function formatConversationDate(conversation) {
  const date = new Date(conversation.updatedAt || conversation.createdAt);
  if (Number.isNaN(date.getTime())) return "";
  if (date.toDateString() === new Date().toDateString()) return "Today";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function ChatSidebar({
  user,
  conversations,
  activeConversationId,
  conversationsStatus,
  isSending,
  onClose,
  onNewConversation,
  onSelectConversation,
  onLogout,
}) {
  return (
    <>
      <button
        className="sidebar-scrim"
        aria-label="Close conversation menu"
        onClick={onClose}
      />
      <aside className="chat-sidebar">
        <div className="sidebar-top">
          <BrandMark compact />
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={onClose}>
            <ChatIcon name="close" />
          </button>
        </div>

        <button
          className="new-chat-button"
          onClick={onNewConversation}
          disabled={isSending}
        >
          <ChatIcon name="plus" className="h-[18px] w-[18px]" />
          <span>New conversation</span>
          <span className="new-chat-shortcut">⌘ K</span>
        </button>

        <div className="history-heading">
          <span>Your conversations</span>
          <span className="history-count">{conversations.length}</span>
        </div>
        <nav className="conversation-list" aria-label="Conversation history">
          {conversationsStatus === "loading" && (
            <div className="history-loading"><span /> Loading conversations</div>
          )}
          {conversationsStatus !== "loading" && conversations.length === 0 && (
            <p className="history-empty">Your chats will show up here.</p>
          )}
          {conversations.map((conversation) => (
            <button
              key={conversation._id}
              className={`conversation-link${activeConversationId === conversation._id ? " selected" : ""}`}
              onClick={() => onSelectConversation(conversation._id)}
              disabled={isSending}
            >
              <ChatIcon name="message" className="h-4 w-4 shrink-0" />
              <span className="conversation-title">{conversation.title || "New conversation"}</span>
              <span className="conversation-date">{formatConversationDate(conversation)}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <UserAvatar name={user?.name} />
          <div className="profile-copy">
            <span className="profile-name">{user?.name || "Your account"}</span>
            <span className="profile-email">{user?.email || "Signed in"}</span>
          </div>
          <button onClick={onLogout} className="icon-button logout-button" aria-label="Sign out" title="Sign out">
            <ChatIcon name="logout" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </aside>
    </>
  );
}
