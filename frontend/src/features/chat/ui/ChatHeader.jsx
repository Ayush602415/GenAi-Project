import { ChatIcon } from "./ChatIcon.jsx";

export function ChatHeader({ title, onMenuClick }) {
  return (
    <header className="flex min-h-[72px] items-center justify-between gap-4 border-b border-emerald-300/10 bg-[#030704]/80 px-[clamp(18px,4vw,56px)] py-3.5 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-emerald-100/50 transition hover:bg-emerald-300/10 hover:text-lime-200 md:hidden"
          onClick={onMenuClick}
          aria-label="Open conversation menu"
        >
          <ChatIcon name="menu" />
        </button>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-emerald-50">{title || "New conversation"}</span>
          <span className="hidden text-[11px] text-emerald-100/40 sm:block">A little more clarity, whenever you need it.</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.05] px-3 py-2 text-[11px] text-emerald-100/80"><span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" /> Downbot AI</div>
    </header>
  );
}
