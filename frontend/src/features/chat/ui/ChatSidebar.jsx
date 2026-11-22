import { BrandMark } from "../../auth/ui/BrandMark.jsx";
import { ChatIcon, UserAvatar } from "./ChatIcon.jsx";

const recentConversations = [
  "Ideas for a weekend project",
  "A simple meal prep plan",
  "Understanding neural networks",
  "Notes for my presentation",
];

export function ChatSidebar({ user, onClose }) {
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

        <button className="new-chat-button">
          <ChatIcon name="plus" className="h-[18px] w-[18px]" />
          <span>New conversation</span>
          <span className="new-chat-shortcut">⌘ K</span>
        </button>

        <div className="history-heading">
          <span>Your conversations</span>
          <span className="history-count">{recentConversations.length}</span>
        </div>
        <nav className="conversation-list" aria-label="Conversation history">
          {recentConversations.map((title, index) => (
            <button
              key={title}
              className={`conversation-link${index === 0 ? " selected" : ""}`}
            >
              <ChatIcon name="message" className="h-4 w-4 shrink-0" />
              <span className="conversation-title">{title}</span>
              <span className="conversation-date">{index === 0 ? "Today" : "Nov 18"}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <UserAvatar name={user?.name} />
          <div className="profile-copy">
            <span className="profile-name">{user?.name || "Your account"}</span>
            <span className="profile-email">{user?.email || "Signed in"}</span>
          </div>
          <button className="icon-button logout-button" aria-label="Account options" title="Account options">
            <ChatIcon name="logout" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </aside>
    </>
  );
}
