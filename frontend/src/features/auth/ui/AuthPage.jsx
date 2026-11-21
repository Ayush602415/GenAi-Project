import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { BrandMark } from "./BrandMark.jsx";

function Field({ label, type, value, onChange, autoComplete }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <input
        className="w-full rounded-xl border border-white/[0.09] bg-[#171719] px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-400/70 focus:ring-4 focus:ring-violet-500/10"
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
      />
    </label>
  );
}

export function AuthPage() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, error, status, clearError } = useAuth();
  const isRegister = mode === "register";
  const busy = status === "loading";

  function switchMode(nextMode) {
    setMode(nextMode);
    clearError();
  }

  async function submit(event) {
    event.preventDefault();
    if (isRegister) await register({ name, email, password });
    else await login({ email, password });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111112] px-5 py-12 text-white">
      <div className="pointer-events-none absolute left-1/2 top-[-290px] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-violet-500/[0.10] blur-[120px]" />
      <div className="relative w-full max-w-[420px]">
        <div className="mb-10">
          <BrandMark />
        </div>

        <section className="rounded-[28px] border border-white/[0.08] bg-[#151516]/90 p-7 shadow-[0_24px_100px_rgba(0,0,0,0.28)] sm:p-9">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">A little more clarity</p>
            <h1 className="text-[30px] font-semibold tracking-[-0.04em]">
              {isRegister ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {isRegister ? "One calm place for all your AI conversations." : "Sign in to pick up where your ideas left off."}
            </p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-xl bg-[#1d1d1f] p-1">
            <button type="button" onClick={() => switchMode("login")} className={`rounded-lg py-2.5 text-sm font-medium transition ${!isRegister ? "bg-[#303033] text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
              Sign in
            </button>
            <button type="button" onClick={() => switchMode("register")} className={`rounded-lg py-2.5 text-sm font-medium transition ${isRegister ? "bg-[#303033] text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
              Create account
            </button>
          </div>

          <form onSubmit={submit} className="space-y-5">
            {isRegister && (
              <Field label="Your name" type="text" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            )}
            <Field label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
            <Field label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isRegister ? "new-password" : "current-password"} />
            {isRegister && <p className="-mt-2 text-xs text-zinc-500">Use at least 8 characters, including a letter and a number.</p>}

            {error && (
              <div role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-400/20 disabled:opacity-60"
            >
              {busy ? "Please wait…" : isRegister ? "Create account" : "Continue"}
              {!busy && <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-zinc-500">
            {isRegister ? "Already have an account?" : "New to Downbot?"}{" "}
            <button type="button" onClick={() => switchMode(isRegister ? "login" : "register")} className="font-medium text-zinc-200 underline decoration-white/20 underline-offset-4 hover:text-white">
              {isRegister ? "Sign in" : "Create an account"}
            </button>
          </p>
        </section>

        <p className="mt-7 text-center text-xs text-zinc-600">Your conversations, all in one place.</p>
      </div>
    </main>
  );
}
