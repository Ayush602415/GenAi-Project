import { ChatIcon } from "./ChatIcon.jsx";
import badge from "../../../../Neon Green DownBot Chatbot Badge.png";

export function ChatWelcome({ name }) {
  return (
    <div className="relative flex w-[min(100%-32px,850px)] flex-1 flex-col items-center justify-center self-center overflow-hidden px-3 py-12 text-center">

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.07] blur-[100px]" />

      {/* Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 rounded-full bg-green-400/20 blur-3xl" />

        <div className="relative rounded-[30px] border border-emerald-300/20 bg-[#101a13] p-2 shadow-[0_0_60px_rgba(74,222,128,0.12)]">
          <img
            src={badge}
            alt="DownBot chatbot"
            className="h-[85px] w-[85px] mt-20 rounded-[23px] object-cover sm:h-[105px] sm:w-[105px]"
          />
        </div>

        <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-xl border border-emerald-300/30 bg-[#102016] text-lime-300">
          <ChatIcon name="sparkle" className="h-4 w-4" />
        </span>
      </div>

      <div className="relative">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.06] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-emerald-300">
            YOUR AI THINKING PARTNER
          </span>
        </div>

        <h1 className="text-[clamp(30px,5vw,48px)] font-semibold leading-tight tracking-[-0.05em] text-white">
          Good to have you here,
          <span className="mt-1 block bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
            {name}.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-[430px] text-sm leading-7 text-emerald-50/45">
          A question, a half-formed idea, a problem to untangle.
          Start anywhere. Let's figure it out together.
        </p>
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-2">
        {["Ask anything", "Explore ideas", "Solve problems"].map((item) => (
          <div
            key={item}
            className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-[10px] text-white/40"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}