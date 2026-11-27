import { ChatIcon } from "./ChatIcon.jsx";

export function ChatHeader({ title, onMenuClick }) {
  return (
    <header className="relative z-10 flex min-h-[76px] items-center justify-between gap-4 border-b border-white/[0.07] bg-[#080d0a]/85 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-10">

      <div className="flex min-w-0 items-center gap-3">
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-emerald-100/70 transition hover:border-emerald-400/30 hover:text-lime-300 md:hidden"
          onClick={onMenuClick}
          aria-label="Open conversation menu"
        >
          <ChatIcon name="menu" />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-white sm:text-base">
            {title || "New conversation"}
          </h2>
          <p className="mt-1 hidden text-[11px] text-emerald-100/40 sm:block">
            Your personal intelligent workspace
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3.5 py-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_#4ade80]" />
        <span className="text-[10px] font-medium tracking-wide text-emerald-200/80 sm:text-xs">
          DownBot AI
        </span>
      </div>
    </header>
  );
}