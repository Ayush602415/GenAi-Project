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
    <div className="w-[calc(100%-32px)] self-center pb-3 pt-4 sm:w-[min(100%-48px,780px)] sm:pb-5">
      <form
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1e1e21] to-[#18181a] px-3.5 pb-2.5 pt-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.17)] transition focus-within:border-violet-300/40 focus-within:shadow-[0_0_0_3px_rgba(140,103,209,0.075),0_16px_48px_rgba(0,0,0,0.17)] sm:rounded-[17px] sm:px-4"
        onSubmit={submit}
      >
        <textarea
          className="block max-h-[180px] min-h-[27px] w-full resize-none border-0 bg-transparent text-[13px] leading-7 text-zinc-100 outline-none placeholder:text-zinc-600"
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
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-zinc-600">Shift + Enter for a new line</span>
          <button
            className="grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-violet-500 text-white transition hover:-translate-y-px hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || disabled || isSending}
          >
            {isSending ? <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-white/35 border-t-white" /> : <ChatIcon name="send" className="h-[17px] w-[17px]" />}
          </button>
        </div>
      </form>
      <p className="mb-0 mt-2.5 text-center text-[10px] text-zinc-600">Downbot can make mistakes. Check important information.</p>
    </div>
  );
}
