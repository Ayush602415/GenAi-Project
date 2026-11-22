import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { ChatComposer } from "./ChatComposer.jsx";
import { ChatHeader } from "./ChatHeader.jsx";
import { ChatSidebar } from "./ChatSidebar.jsx";
import { ChatWelcome } from "./ChatWelcome.jsx";

export function ChatPage() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const firstName = user?.name?.trim().split(/\s+/)[0] || "friend";

  return (
    <main className={`chat-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <ChatSidebar user={user} onClose={() => setIsSidebarOpen(false)} />
      <section className="chat-main">
        <ChatHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="conversation-stage">
          <ChatWelcome name={firstName} />
        </div>
        <ChatComposer />
      </section>
    </main>
  );
}
