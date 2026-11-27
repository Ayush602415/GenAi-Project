import { BrandMark } from "../../auth/ui/BrandMark.jsx";
import { ChatIcon, UserAvatar } from "./ChatIcon.jsx";

function formatConversationDate(conversation) {
  const date = new Date(conversation.updatedAt || conversation.createdAt);

  if (Number.isNaN(date.getTime())) return "";

  if (date.toDateString() === new Date().toDateString()) return "Today";

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export function ChatSidebar({
  user,
  conversations,
  activeConversationId,
  conversationsStatus,
  isSending,
  isOpen,
  onClose,
  onNewConversation,
  onSelectConversation,
  onLogout,
}) {
  return (
    <>
      <button
        className={`fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-label="Close conversation menu"
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(300px,calc(100vw-50px))] flex-col border-r border-white/[0.07] bg-[#080e0b] px-5 pb-5 pt-6 shadow-[25px_0_70px_rgba(0,0,0,0.6)] transition-transform duration-300 md:relative md:z-20 md:w-[285px] md:flex-none md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Brand */}
        <div className="flex items-center justify-between px-1">
          <BrandMark compact />

          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-white/40 hover:bg-white/[0.06] hover:text-white md:hidden"
            aria-label="Close menu"
            onClick={onClose}
          >
            <ChatIcon name="close" />
          </button>
        </div>

        {/* New chat */}
        <button
          className="group mt-9 flex items-center gap-3 rounded-xl border border-emerald-300/20 bg-gradient-to-r from-emerald-400/[0.12] to-lime-400/[0.04] px-4 py-3.5 text-left text-sm font-medium text-emerald-50 transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.12] hover:shadow-[0_0_25px_rgba(74,222,128,0.08)] disabled:opacity-50"
          onClick={onNewConversation}
          disabled={isSending}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/15 text-lime-300">
            <ChatIcon name="plus" />
          </span>

          <span>New conversation</span>

          <span className="ml-auto text-[10px] text-white/30">⌘ K</span>
        </button>

        {/* History heading */}
        <div className="mb-3 mt-9 flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100/40">
            Recent conversations
          </span>

          <span className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[10px] text-emerald-200/70">
            {conversations.length}
          </span>
        </div>

        {/* Conversation list */}
        <nav
          className="scrollbar-neon flex min-h-0 flex-col gap-1.5 overflow-y-auto"
          aria-label="Conversation history"
        >
          {conversationsStatus === "loading" && (
            <div className="flex items-center gap-2 px-2 py-3 text-xs text-white/40">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
              Loading conversations
            </div>
          )}

          {conversationsStatus !== "loading" &&
            conversations.length === 0 && (
              <p className="px-2 py-3 text-xs leading-6 text-white/35">
                Your conversations will appear here.
              </p>
            )}

          {conversations.map((conversation) => (
            <button
              key={conversation._id}
              className={`group flex min-w-0 items-center gap-3 rounded-xl border px-3 py-3 text-left transition disabled:opacity-50 ${
                activeConversationId === conversation._id
                  ? "border-emerald-300/15 bg-emerald-400/[0.09] text-lime-100 shadow-[inset_2px_0_0_#a3e635]"
                  : "border-transparent text-white/45 hover:border-white/[0.05] hover:bg-white/[0.04] hover:text-white/80"
              }`}
              onClick={() => onSelectConversation(conversation._id)}
              disabled={isSending}
            >
              <ChatIcon
                name="message"
                className="h-[17px] w-[17px] shrink-0"
              />

              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                {conversation.title || "New conversation"}
              </span>

              <span className="shrink-0 text-[9px] text-white/25">
                {formatConversationDate(conversation)}
              </span>
            </button>
          ))}
        </nav>

        {/* User profile */}
        <div className="mt-auto border-t border-white/[0.07] pt-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
            <UserAvatar name={user?.name} />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate text-xs font-semibold text-white/90">
                {user?.name || "Your account"}
              </span>

              <span className="truncate text-[10px] text-white/35">
                {user?.email || "Signed in"}
              </span>
            </div>

            <button
              onClick={onLogout}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white/35 transition hover:bg-rose-400/10 hover:text-rose-300"
              aria-label="Sign out"
              title="Sign out"
            >
              <ChatIcon name="logout" className="h-[17px] w-[17px]" />
            </button>
          </div>

          <p className="mt-4 text-center text-[9px] tracking-wider text-white/20">
            POWERED BY DOWNBOT AI
          </p>
        </div>
      </aside>
    </>
  );
}