import { ChatIcon } from "./ChatIcon.jsx";
import badge from "../../../../Neon Green DownBot Chatbot Badge.png";

const promptIdeas = [
  { title: "Make a plan", description: "Help me turn a big goal into small steps." },
  { title: "Get inspired", description: "Give me a fresh perspective on a problem." },
  { title: "Learn something", description: "Explain a tricky idea in simple terms." },
];

export function ChatWelcome({ name, onPrompt }) {
  return (
    <div className="flex w-[min(100%-32px,760px)] flex-1 flex-col items-center justify-center self-center px-0 py-8 text-center sm:w-[min(100%-40px,760px)] sm:py-12">
      <div className="grid h-20 w-20 place-items-center rounded-[22px] border border-lime-300/25 bg-[#061008] p-1 shadow-[0_0_45px_rgba(0,255,90,0.18)]">
        <img className="h-full w-full rounded-[18px] object-cover" src={badge} alt="DownBot chatbot" />
      </div>
      <p className="mb-3 mt-6 text-[10px] font-semibold tracking-[0.17em] text-lime-300">YOUR THINKING PARTNER</p>
      <h1 className="text-[clamp(29px,4vw,41px)] font-semibold tracking-[-0.055em] text-zinc-100">Good to have you here, {name}.</h1>
      <p className="mb-7 mt-3 max-w-[410px] text-[13px] leading-7 text-emerald-50/60 sm:mb-8 sm:text-sm">A question, a half-formed idea, a problem to untangle. Start anywhere.</p>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        {promptIdeas.map((idea) => (
          <button className="group relative flex min-h-0 flex-col items-start gap-2 rounded-xl border border-emerald-300/15 bg-[#07100a]/80 px-3.5 py-3.5 text-left transition hover:-translate-y-0.5 hover:border-lime-300/40 hover:bg-emerald-300/[0.07] hover:shadow-[0_8px_30px_rgba(0,255,90,0.08)] sm:min-h-[106px] sm:rounded-[15px] sm:px-4 sm:py-4" key={idea.title} onClick={() => onPrompt(idea.description)}>
            <span className="text-xs font-semibold text-emerald-50">{idea.title}</span>
            <span className="max-w-[calc(100%-22px)] text-[11px] leading-relaxed text-emerald-100/45 sm:max-w-[180px]">{idea.description}</span>
            <ChatIcon name="arrow" className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-300/80 opacity-100 transition group-hover:translate-x-0.5 sm:right-3 sm:top-3.5 sm:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}
