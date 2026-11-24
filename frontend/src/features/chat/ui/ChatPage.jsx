import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth.js";
import {
  clearConversationError,
  clearConversationMessages,
  fetchConversationMessages,
  fetchConversations,
  sendConversationMessage,
} from "../../auth/state/conversationSlice.js";
import { ChatComposer } from "./ChatComposer.jsx";
import { ChatHeader } from "./ChatHeader.jsx";
import { ChatIcon } from "./ChatIcon.jsx";
import { ChatSidebar } from "./ChatSidebar.jsx";
import { ChatThread } from "./ChatThread.jsx";
import { ChatWelcome } from "./ChatWelcome.jsx";

export function ChatPage() {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const {
    conversations,
    messages,
    activeConversationId,
    conversationsStatus,
    messagesStatus,
    sendStatus,
    error,
  } = useSelector((state) => state.conversation);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const stageRef = useRef(null);
  const firstName = user?.name?.trim().split(/\s+/)[0] || "friend";
  const isSending = sendStatus === "sending";
  const isLoadingMessages = messagesStatus === "loading";
  const activeConversation = conversations.find((item) => item._id === activeConversationId);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.scrollTo({ top: stageRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  function startNewConversation() {
    dispatch(clearConversationMessages());
    setIsSidebarOpen(false);
  }

  function openConversation(conversationId) {
    if (conversationId === activeConversationId) {
      setIsSidebarOpen(false);
      return;
    }
    dispatch(fetchConversationMessages(conversationId));
    setIsSidebarOpen(false);
  }

  function sendMessage(content) {
    dispatch(sendConversationMessage({ content, conversationId: activeConversationId }));
  }

  async function handleLogout() {
    try {
      setLogoutError("");
      await logout();
    } catch (requestError) {
      setLogoutError(requestError.response?.data?.message || "Unable to sign out. Please try again.");
    }
  }

  return (
    <main className="flex h-dvh overflow-hidden bg-[#030704] text-emerald-50 [background-image:radial-gradient(ellipse_at_72%_0%,rgba(0,255,74,0.11),transparent_40%),radial-gradient(ellipse_at_12%_100%,rgba(0,120,45,0.08),transparent_42%)]">
      <ChatSidebar
        user={user}
        conversations={conversations}
        activeConversationId={activeConversationId}
        conversationsStatus={conversationsStatus}
        isSending={isSending}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewConversation={startNewConversation}
        onSelectConversation={openConversation}
        onLogout={handleLogout}
      />
      <section className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          title={activeConversation?.title}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        {(error || logoutError) && (
          <div className="mx-4 mt-4 flex items-center justify-between gap-3 rounded-xl border border-rose-400/20 bg-rose-950/30 px-4 py-3 text-sm text-rose-200 sm:mx-8 lg:mx-auto lg:w-[min(100%-4rem,780px)]" role="alert">
            <span>{error || logoutError}</span>
            <button
              className="grid place-items-center text-rose-300 transition hover:text-white"
              onClick={() => {
                setLogoutError("");
                if (error) dispatch(clearConversationError());
              }}
              aria-label="Dismiss error"
            >
              <ChatIcon name="close" className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="scrollbar-neon flex min-h-0 flex-1 flex-col overflow-y-auto" ref={stageRef}>
          {isLoadingMessages ? (
            <div className="flex items-center justify-center gap-3 p-5 text-xs text-emerald-100/60"><span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300/25 border-t-lime-300" /> Opening your conversation…</div>
          ) : messages.length ? (
            <ChatThread messages={messages} user={user} isSending={isSending} />
          ) : (
            <ChatWelcome name={firstName} onPrompt={sendMessage} />
          )}
        </div>
        <div className="flex items-center justify-center sticky bottom-0 z-10">
          <ChatComposer
            onSend={sendMessage}
            disabled={isLoadingMessages}
            isSending={isSending}
          />
        </div>
      </section>
    </main>
  );
}
