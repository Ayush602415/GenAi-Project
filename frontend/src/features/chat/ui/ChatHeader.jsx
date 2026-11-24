import { ChatIcon } from "./ChatIcon.jsx";

export function ChatHeader({ title, onMenuClick }) {
  return (
    <header className="flex min-h-[72px] items-center justify-between gap-4 border-b border-white/[0.075] px-[clamp(18px,4vw,56px)] py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/[0.06] hover:text-white md:hidden"
          onClick={onMenuClick}
          aria-label="Open conversation menu"
        >
          <ChatIcon name="menu" />
        </button>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-zinc-100">{title || "New conversation"}</span>
          <span className="hidden text-[11px] text-zinc-500 sm:block">A little more clarity, whenever you need it.</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/[0.075] bg-white/[0.025] px-3 py-2 text-[11px] text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(153,117,234,0.55)]" /> Downbot AI</div>
    </header>
  );
}
