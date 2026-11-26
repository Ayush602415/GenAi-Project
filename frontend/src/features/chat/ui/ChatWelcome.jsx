import { ChatIcon } from "./ChatIcon.jsx";
import badge from "../../../../Neon Green DownBot Chatbot Badge.png";


export function ChatWelcome({ name }) {
  return (
    <div className="flex w-[min(100%-32px,760px)] flex-1 flex-col items-center justify-center self-center px-0 py-8 text-center sm:w-[min(100%-40px,760px)] sm:py-12">
      <div className="grid h-20 w-20 place-items-center rounded-[22px] border border-lime-300/25 bg-[#061008] p-1 shadow-[0_0_45px_rgba(0,255,90,0.18)]">
        <img className="h-full w-full rounded-[18px] object-cover" src={badge} alt="DownBot chatbot" />
      </div>
      <p className="mb-3 mt-6 text-[10px] font-semibold tracking-[0.17em] text-lime-300">YOUR THINKING PARTNER</p>
      <h1 className="text-[clamp(29px,4vw,41px)] font-semibold tracking-[-0.055em] text-zinc-100">Good to have you here, {name}.</h1>
      <p className="mb-7 mt-3 max-w-[410px] text-[13px] leading-7 text-emerald-50/60 sm:mb-8 sm:text-sm">A question, a half-formed idea, a problem to untangle. Start anywhere.</p>
    </div>
  );
}
