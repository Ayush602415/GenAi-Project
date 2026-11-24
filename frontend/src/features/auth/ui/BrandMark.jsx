import badge from "../../../../Neon Green DownBot Chatbot Badge.png";

export function BrandMark({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "justify-center"}`}>
      <img
        className={`${compact ? "h-10 w-10" : "h-14 w-14"} shrink-0 rounded-full object-cover shadow-[0_0_22px_rgba(0,255,90,0.35)]`}
        src={badge}
        alt="DownBot"
      />
      <span className={`${compact ? "text-lg" : "text-xl"} font-semibold tracking-tight text-white`}>
        Down<span className="text-lime-400">Bot</span>
      </span>
    </div>
  );
}
