import { useAuth, useInitializeAuth } from "./features/auth/hooks/useAuth.js";
import { AuthPage } from "./features/auth/ui/AuthPage.jsx";
import { ChatPage } from "./features/chat/ui/ChatPage.jsx";

export default function App() {
  useInitializeAuth();

  const { status } = useAuth();

  if (status === "loading") {
    return (
      <main className="grid min-h-screen place-items-center bg-[#050807] text-emerald-100/70">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_15px_#4ade80]" />
          Preparing your workspace...
        </div>
      </main>
    );
  }

  return status === "authenticated" ? <ChatPage /> : <AuthPage />;
}