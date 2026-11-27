import badge from "../../../../Neon Green DownBot Chatbot Badge.png";

export function BrandMark({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "justify-center"}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl" />
        <img
          src={badge}
          alt="DownBot"
          className={`relative shrink-0 rounded-full object-cover ${
            compact ? "h-11 w-11" : "h-16 w-16"
          }`}
        />
      </div>

      <div>
        <span
          className={`font-bold tracking-tight text-white ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          Down<span className="text-lime-400">Bot</span>
        </span>

        {!compact && (
          <p className="mt-0.5 text-[10px] tracking-[0.25em] text-emerald-200/40">
            YOUR AI THINKING PARTNER
          </p>
        )}
      </div>
    </div>
  );
}