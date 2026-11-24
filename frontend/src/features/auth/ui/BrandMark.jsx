export function BrandMark({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "justify-center"}`}>
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-[0_8px_24px_rgba(139,92,246,0.28)]">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M5 5.5h8.2a5.8 5.8 0 1 1 0 11.6H11M5 5.5v13M5 12h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-xl font-semibold tracking-tight text-white">downbot</span>
    </div>
  );
}
