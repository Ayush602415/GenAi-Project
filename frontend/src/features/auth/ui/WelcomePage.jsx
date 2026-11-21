import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { BrandMark } from "./BrandMark.jsx";

export function WelcomePage() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? "Unable to sign out. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#111112] px-5 py-8 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <BrandMark compact />
        <button onClick={handleLogout} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
          Sign out
        </button>
      </header>
      <section className="mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center text-center">
        <div className="mb-7 grid h-16 w-16 place-items-center rounded-[22px] border border-violet-300/15 bg-violet-400/[0.08] text-violet-200">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </div>
        <p className="mb-3 text-sm font-medium text-violet-300">Your space is ready</p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Good to have you here, {user?.name?.split(" ")[0] || "friend"}.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-zinc-400">
          Your Downbot account is all set. A thoughtful place for your AI conversations is just around the corner.
        </p>
        {error && <p role="alert" className="mt-6 text-sm text-rose-300">{error}</p>}
      </section>
    </main>
  );
}
