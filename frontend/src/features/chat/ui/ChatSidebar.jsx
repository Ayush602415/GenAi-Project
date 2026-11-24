import { BrandMark } from "../../auth/ui/BrandMark.jsx";
import { ChatIcon, UserAvatar } from "./ChatIcon.jsx";

function formatConversationDate(conversation) {
  const date = new Date(conversation.updatedAt || conversation.createdAt);
  if (Number.isNaN(date.getTime())) return "";
  if (date.toDateString() === new Date().toDateString()) return "Today";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
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
        className={`fixed inset-0 z-30 border-0 bg-black/60 transition-opacity duration-200 md:hidden ${isOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
        aria-label="Close conversation menu"
        onClick={onClose}
      />
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[min(290px,calc(100vw-54px))] flex-col border-r border-emerald-400/10 bg-[#050a06] px-4 pb-4 pt-6 shadow-[20px_0_70px_rgba(0,0,0,0.65)] transition-transform duration-200 md:relative md:z-20 md:w-[276px] md:flex-none md:translate-x-0 md:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-1">
          <BrandMark compact />
          <button className="grid h-9 w-9 place-items-center rounded-lg text-emerald-100/50 transition hover:bg-emerald-300/10 hover:text-lime-200 md:hidden" aria-label="Close menu" onClick={onClose}>
            <ChatIcon name="close" />
          </button>
        </div>

        <button
          className="mt-8 flex items-center gap-2.5 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.06] px-3 py-3 text-left text-[13px] font-medium text-emerald-50 transition hover:border-lime-300/50 hover:bg-emerald-300/10 hover:shadow-[0_0_24px_rgba(0,255,90,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onNewConversation}
          disabled={isSending}
        >
          <ChatIcon name="plus" className="h-[18px] w-[18px] text-lime-300" />
          <span>New conversation</span>
          <span className="ml-auto text-[10px] text-emerald-100/40">⌘ K</span>
        </button>

        <div className="mb-2 mt-7 flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-[0.055em] text-emerald-100/40">
          <span>Your conversations</span>
          <span className="grid h-5 min-w-5 place-items-center rounded-md bg-emerald-300/[0.08] text-[10px] font-normal tracking-normal text-emerald-100/65">{conversations.length}</span>
        </div>
        <nav className="scrollbar-neon flex min-h-0 flex-col gap-1 overflow-y-auto" aria-label="Conversation history">
          {conversationsStatus === "loading" && (
            <div className="flex items-center gap-2 px-2 py-2.5 text-xs text-emerald-100/45"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" /> Loading conversations</div>
          )}
          {conversationsStatus !== "loading" && conversations.length === 0 && (
            <p className="px-2 py-2.5 text-xs leading-relaxed text-emerald-100/40">Your chats will show up here.</p>
          )}
          {conversations.map((conversation) => (
            <button
              key={conversation._id}
              className={`flex min-w-0 items-center gap-2 rounded-lg border px-2 py-2.5 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${activeConversationId === conversation._id ? "border-emerald-300/20 bg-emerald-300/[0.09] text-lime-100 shadow-[inset_2px_0_0_0_rgba(163,230,53,0.8)]" : "border-transparent text-emerald-100/55 hover:bg-emerald-300/[0.06] hover:text-emerald-50"}`}
              onClick={() => onSelectConversation(conversation._id)}
              disabled={isSending}
            >
              <ChatIcon name="message" className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs">{conversation.title || "New conversation"}</span>
              <span className="shrink-0 text-[10px] text-emerald-100/30">{formatConversationDate(conversation)}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 border-t border-emerald-300/10 px-0.5 pb-0.5 pt-4">
          <UserAvatar name={user?.name} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-emerald-50">{user?.name || "Your account"}</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-emerald-100/40">{user?.email || "Signed in"}</span>
          </div>
          <button onClick={onLogout} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-emerald-100/40 transition hover:bg-emerald-300/10 hover:text-lime-200" aria-label="Sign out" title="Sign out">
            <ChatIcon name="logout" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </aside>
    </>
  );
}
