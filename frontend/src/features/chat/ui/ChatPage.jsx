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
    <main className={`chat-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <ChatSidebar
        user={user}
        conversations={conversations}
        activeConversationId={activeConversationId}
        conversationsStatus={conversationsStatus}
        isSending={isSending}
        onClose={() => setIsSidebarOpen(false)}
        onNewConversation={startNewConversation}
        onSelectConversation={openConversation}
        onLogout={handleLogout}
      />
      <section className="chat-main">
        <ChatHeader
          title={activeConversation?.title}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        {(error || logoutError) && (
          <div className="chat-error" role="alert">
            <span>{error || logoutError}</span>
            <button
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
        <div className="conversation-stage" ref={stageRef}>
          {isLoadingMessages ? (
            <div className="loading-thread"><span className="loading-spinner" /> Opening your conversation…</div>
          ) : messages.length ? (
            <ChatThread messages={messages} user={user} isSending={isSending} />
          ) : (
            <ChatWelcome name={firstName} onPrompt={sendMessage} />
          )}
        </div>
        <ChatComposer
          onSend={sendMessage}
          disabled={isLoadingMessages}
          isSending={isSending}
        />
      </section>
    </main>
  );
}
