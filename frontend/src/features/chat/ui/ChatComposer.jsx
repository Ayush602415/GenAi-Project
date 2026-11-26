import { useRef, useState } from "react";
import { ChatIcon } from "./ChatIcon.jsx";

export function ChatComposer({ onSend, disabled = false, isSending = false, plus }) {
  const [draft, setDraft] = useState("");
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

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
        className="rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-[#0a160d] to-[#050a06] px-3.5 pb-2.5 pt-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_28px_rgba(0,255,90,0.06)] transition focus-within:border-lime-300/50 focus-within:shadow-[0_0_0_3px_rgba(74,222,128,0.1),0_16px_48px_rgba(0,0,0,0.5)] sm:rounded-[17px] sm:px-4"
        onSubmit={submit}
      >
       
        <textarea
          className="block max-h-[180px] min-h-[27px] w-full resize-none border-0 bg-transparent text-[13px] leading-7 text-emerald-50 outline-none placeholder:text-emerald-100/35"
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
          <button
            type="button"
            className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[11px] text-emerald-100/55 transition hover:bg-emerald-300/10 hover:text-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Attach a file"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isSending}
          >
            <ChatIcon name="plus" className="h-5 w-5" />
          </button>
          <input ref={fileInputRef} type="file" className="hidden" aria-label="Choose a file" />
          <button
            className="grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-gradient-to-br from-lime-300 to-green-400 text-[#031006] shadow-[0_0_16px_rgba(0,255,90,0.24)] transition hover:-translate-y-px hover:brightness-110 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:bg-none disabled:text-zinc-500 disabled:shadow-none"
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || disabled || isSending}
          >
            {isSending ? (
              <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-white/35 border-t-white" />
            ) : (
              <ChatIcon name="send" className="h-[17px] w-[17px]" />
            )}
          </button>
        </div>
      </form>
      <p className="mb-0 mt-2.5 text-center text-[10px] text-emerald-100/30">
        Downbot can make mistakes. Check important information.
      </p>
    </div>
  );
}




