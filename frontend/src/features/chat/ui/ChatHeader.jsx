import { ChatIcon } from "./ChatIcon.jsx";

export function ChatHeader({ title, onMenuClick }) {
  return (
    <header className="chat-header">
      <div className="header-title-wrap">
        <button
          className="icon-button mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open conversation menu"
        >
          <ChatIcon name="menu" />
        </button>
        <div className="header-title">
          <span className="header-title-text">{title || "New conversation"}</span>
          <span className="header-subtitle">A little more clarity, whenever you need it.</span>
        </div>
      </div>
      <div className="model-badge"><span /> Downbot AI</div>
    </header>
  );
}
