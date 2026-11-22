import { useRef, useState } from "react";
import { ChatIcon } from "./ChatIcon.jsx";

export function ChatComposer({ onSend, disabled = false, isSending = false }) {
  const [draft, setDraft] = useState("");
  const textareaRef = useRef(null);

  function submit(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || disabled || isSending) return;
    onSend(content);
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div className="composer-wrap">
      <form className="composer" onSubmit={submit}>
        <textarea
          ref={textareaRef}
          rows={1}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            event.target.style.height = "auto";
            event.target.style.height = `${Math.min(event.target.scrollHeight, 180)}px`;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit(event);
            }
          }}
          placeholder="Ask anything, or just start with a thought…"
          aria-label="Message Downbot"
          disabled={disabled || isSending}
        />
        <div className="composer-toolbar">
          <span className="composer-hint">Shift + Enter for a new line</span>
          <button
            className="send-button"
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || disabled || isSending}
          >
            {isSending ? <span className="send-spinner" /> : <ChatIcon name="send" className="h-[17px] w-[17px]" />}
          </button>
        </div>
      </form>
      <p className="composer-disclaimer">Downbot can make mistakes. Check important information.</p>
    </div>
  );
}
