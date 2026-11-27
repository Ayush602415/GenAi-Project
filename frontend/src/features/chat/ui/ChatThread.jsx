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
    <div className="flex w-[calc(100%-32px)] flex-col gap-8 self-center py-8 sm:w-[min(100%-48px,850px)] sm:gap-10 sm:py-10">

      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const content = Array.isArray(message.content)
          ? message.content
              .map((part) =>
                typeof part === "string" ? part : part?.text || "",
              )
              .join("")
          : typeof message.content === "string"
            ? message.content
            : "";

        return (
          <article
            key={message.id || message._id || `${message.role}-${index}`}
            className={`flex items-start gap-3 sm:gap-4 ${
              isUser ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                isUser
                  ? "border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/70"
                  : "border border-emerald-300/25 bg-gradient-to-br from-emerald-400/20 to-[#07130c] text-lime-300 shadow-[0_0_20px_rgba(74,222,128,0.1)]"
              }`}
            >
              {isUser ? (
                <span className="text-xs">{initials(user?.name)}</span>
              ) : (
                <ChatIcon name="sparkle" className="h-5 w-5" />
              )}
            </div>

            {/* Message */}
            <div
              className={`min-w-0 max-w-[88%] sm:max-w-[85%] ${
                isUser ? "text-right" : ""
              }`}
            >
              <div
                className={`mb-2 text-[11px] font-semibold tracking-wide ${
                  isUser ? "text-white/55" : "text-lime-300"
                }`}
              >
                {isUser ? firstName : "DownBot"}
              </div>

              <div
                className={`overflow-wrap-anywhere rounded-2xl px-4 py-3.5 text-left text-sm leading-7 sm:px-5 sm:py-4 ${
                  isUser
                    ? "rounded-tr-sm border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.12] to-emerald-400/[0.04] text-emerald-50/90"
                    : "rounded-tl-sm border border-white/[0.06] bg-[#101713]/80 text-emerald-50/80 shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
                } [&_a]:text-lime-300 [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-lime-400/50 [&_blockquote]:pl-4 [&_blockquote]:text-emerald-100/60 [&_code]:break-words [&_code]:rounded [&_code]:bg-emerald-300/[0.09] [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mb-3 [&_h1]:mt-5 [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-base [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-black/50 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-emerald-300/15 [&_td]:p-2 [&_th]:border [&_th]:border-emerald-300/20 [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5]`}
              >
                {content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                ) : isSending && !isUser ? (
                  <span className="inline-flex h-5 items-center gap-1.5">
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" />
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300 [animation-delay:130ms]" />
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300 [animation-delay:260ms]" />
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