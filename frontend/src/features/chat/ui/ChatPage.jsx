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

  const activeConversation = conversations.find(
    (item) => item._id === activeConversationId
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.scrollTo({
        top: stageRef.current.scrollHeight,
        behavior: "smooth",
      });
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
    dispatch(
      sendConversationMessage({
        content,
        conversationId: activeConversationId,
      })
    );
  }

  async function handleLogout() {
    try {
      setLogoutError("");
      await logout();
    } catch (requestError) {
      setLogoutError(
        requestError.response?.data?.message ||
          "Unable to sign out. Please try again."
      );
    }
  }

  return (
    <main className="relative flex h-dvh overflow-hidden bg-[#050807] text-emerald-50">

      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.055] blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-60 left-1/3 h-[500px] w-[500px] rounded-full bg-green-500/[0.04] blur-[150px]" />

      {/* Sidebar */}
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

      {/* Main workspace */}
      <section className="relative z-10 flex min-w-0 flex-1 flex-col">

        <ChatHeader
          title={activeConversation?.title}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Error messages */}
        {(error || logoutError) && (
          <div
            className="mx-4 mt-4 flex items-center justify-between gap-3 rounded-xl border border-rose-400/20 bg-rose-950/40 px-4 py-3 text-sm text-rose-200 sm:mx-8 lg:mx-auto lg:w-[min(100%-4rem,850px)]"
            role="alert"
          >
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

        {/* Chat area */}
        <div
          className="scrollbar-neon flex min-h-0 flex-1 flex-col overflow-y-auto"
          ref={stageRef}
        >
          {isLoadingMessages ? (
            <div className="flex items-center justify-center gap-3 p-8 text-xs text-emerald-100/50">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300/20 border-t-lime-300" />
              Opening your conversation...
            </div>
          ) : messages.length ? (
            <ChatThread
              messages={messages}
              user={user}
              isSending={isSending}
            />
          ) : (
            <ChatWelcome name={firstName} />
          )}
        </div>

        {/* Composer area */}
        <div className="sticky bottom-0 z-10 w-full border-t border-white/[0.045] bg-gradient-to-t from-[#050807] via-[#050807]/95 to-transparent px-3 pb-4 pt-5 sm:px-6 sm:pb-6">

          <div
            className="
              mx-auto w-full max-w-[850px]
              [&_textarea]:!rounded-2xl
              [&_textarea]:!border-white/[0.09]
              [&_textarea]:!bg-[#101713]
              [&_textarea]:!text-emerald-50
              [&_textarea]:!placeholder:text-emerald-100/30
              [&_textarea]:!shadow-[0_10px_40px_rgba(0,0,0,0.25)]
              [&_textarea:focus]:!border-emerald-400/40
              [&_button]:!transition
            "
          >
            <ChatComposer
              onSend={sendMessage}
              disabled={isLoadingMessages}
              isSending={isSending}
            />
          </div>
        </div>
      </section>
    </main>
  );
}