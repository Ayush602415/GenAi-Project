import { ChatIcon } from "./ChatIcon.jsx";

const promptIdeas = [
  { title: "Make a plan", description: "Help me turn a big goal into small steps." },
  { title: "Get inspired", description: "Give me a fresh perspective on a problem." },
  { title: "Learn something", description: "Explain a tricky idea in simple terms." },
];

export function ChatWelcome({ name, onPrompt }) {
  return (
    <div className="flex w-[min(100%-32px,760px)] flex-1 flex-col items-center justify-center self-center px-0 py-8 text-center sm:w-[min(100%-40px,760px)] sm:py-12">
      <div className="grid h-14 w-14 place-items-center rounded-[18px] border border-violet-300/20 bg-gradient-to-br from-violet-400/20 to-violet-700/5 text-violet-200 shadow-[0_12px_55px_rgba(93,65,144,0.11)]"><ChatIcon name="sparkle" className="h-7 w-7" /></div>
      <p className="mb-3 mt-6 text-[10px] font-semibold tracking-[0.17em] text-violet-300">YOUR THINKING PARTNER</p>
      <h1 className="text-[clamp(29px,4vw,41px)] font-semibold tracking-[-0.055em] text-zinc-100">Good to have you here, {name}.</h1>
      <p className="mb-7 mt-3 max-w-[410px] text-[13px] leading-7 text-zinc-400 sm:mb-8 sm:text-sm">A question, a half-formed idea, a problem to untangle. Start anywhere.</p>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        {promptIdeas.map((idea) => (
          <button className="group relative flex min-h-0 flex-col items-start gap-2 rounded-xl border border-white/[0.075] bg-white/[0.025] px-3.5 py-3.5 text-left transition hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-violet-400/[0.06] sm:min-h-[106px] sm:rounded-[15px] sm:px-4 sm:py-4" key={idea.title} onClick={() => onPrompt(idea.description)}>
            <span className="text-xs font-semibold text-zinc-200">{idea.title}</span>
            <span className="max-w-[calc(100%-22px)] text-[11px] leading-relaxed text-zinc-500 sm:max-w-[180px]">{idea.description}</span>
            <ChatIcon name="arrow" className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-300/70 opacity-100 transition group-hover:translate-x-0.5 sm:right-3 sm:top-3.5 sm:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}
