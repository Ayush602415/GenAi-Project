import { ChatIcon } from "./ChatIcon.jsx";

export function ChatComposer() {
  return (
    <div className="composer-wrap">
      <div className="composer">
        <textarea
          rows={1}
          placeholder="Ask anything, or just start with a thought…"
          aria-label="Message Downbot"
        />
        <div className="composer-toolbar">
          <span className="composer-hint">Shift + Enter for a new line</span>
          <button className="send-button" type="button" aria-label="Send message" disabled>
            <ChatIcon name="send" className="h-[17px] w-[17px]" />
          </button>
        </div>
      </div>
      <p className="composer-disclaimer">Downbot can make mistakes. Check important information.</p>
    </div>
  );
}
