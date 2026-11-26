import { ChatIcon } from "./ChatIcon.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function initials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "Y"
  );
}

export function ChatThread({ messages, user, isSending }) {
  const firstName = user?.name?.trim().split(/\s+/)[0] || "You";

  return (
    <div className="flex w-[calc(100%-32px)] flex-col gap-6 self-center py-7 sm:w-[min(100%-48px,780px)] sm:gap-7 sm:py-10">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const content = message.content || "";
        return (
          <article
            key={message.id || message._id || `${message.role}-${index}`}
            className="flex items-start gap-3.5"
          >
            <div
              className={`mt-px grid h-[31px] w-[31px] shrink-0 place-items-center rounded-[11px] text-[11px] font-semibold ${isUser ? "border border-white/10 bg-white/[0.08] text-zinc-200" : "border border-lime-300/25 bg-green-400/[0.12] text-lime-200 shadow-[0_0_18px_rgba(0,255,90,0.1)]"}`}
            >
              {isUser ? (
                initials(user?.name)
              ) : (
                <ChatIcon name="sparkle" className="h-[18px] w-[18px]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`mb-2 mt-0.5 text-xs font-semibold ${isUser ? "text-emerald-50/90" : "text-lime-100"}`}>
                {isUser ? firstName : "Downbot"}
              </div>
              <div className="overflow-wrap-anywhere whitespace-pre-wrap text-sm leading-7 text-emerald-50/80 [&_a]:text-lime-300 [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-lime-400/50 [&_blockquote]:pl-4 [&_blockquote]:text-emerald-100/60 [&_code]:break-words [&_code]:rounded [&_code]:bg-emerald-300/[0.08] [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mb-3 [&_h1]:mt-5 [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-base [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-0 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-emerald-300/15 [&_td]:p-2 [&_th]:border [&_th]:border-emerald-300/20 [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5">
                {content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                ) : isSending && !isUser ? (
                  <span className="inline-flex h-[18px] items-center gap-1">
                    <i className="h-[5px] w-[5px] animate-pulse rounded-full bg-lime-300" />
                    <i className="h-[5px] w-[5px] animate-pulse rounded-full bg-lime-300 [animation-delay:130ms]" />
                    <i className="h-[5px] w-[5px] animate-pulse rounded-full bg-lime-300 [animation-delay:260ms]" />
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
