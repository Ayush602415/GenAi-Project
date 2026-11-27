import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { BrandMark } from "./BrandMark.jsx";

function Field({ label, type, value, onChange, autoComplete }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium tracking-wide text-emerald-100/65">
        {label}
      </span>

      <input
        className="w-full rounded-xl border border-white/[0.09] bg-[#080e0b] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-emerald-400/60 focus:bg-[#0b1510] focus:ring-4 focus:ring-emerald-400/[0.07]"
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050807] px-5 py-12 text-white">

      <div className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-emerald-500/[0.09] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-green-400/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/[0.04]" />

      <div className="relative w-full max-w-[460px]">

        <div className="mb-9">
          <BrandMark />
        </div>

        <section className="glass-panel rounded-[28px] p-7 shadow-2xl sm:p-10">

          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
              DOWNBOT AI WORKSPACE
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {isRegister ? "Create your account" : "Welcome back"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-emerald-100/45">
              {isRegister
                ? "Start your journey with your personal AI assistant."
                : "Your ideas are waiting. Let's continue where you left off."}
            </p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-xl border border-white/[0.07] bg-[#070c09] p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-lg py-3 text-xs font-semibold transition ${
                !isRegister
                  ? "bg-gradient-to-r from-emerald-500/20 to-lime-400/10 text-lime-200 shadow-inner"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`rounded-lg py-3 text-xs font-semibold transition ${
                isRegister
                  ? "bg-gradient-to-r from-emerald-500/20 to-lime-400/10 text-lime-200 shadow-inner"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={submit} className="space-y-5">

            {isRegister && (
              <Field
                label="Your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            )}

            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            {isRegister && (
              <p className="text-xs text-emerald-100/40">
                Use at least 8 characters, including a letter and a number.
              </p>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-rose-400/20 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-400 py-4 text-sm font-bold text-[#041008] shadow-[0_0_25px_rgba(74,222,128,0.18)] transition hover:brightness-110 disabled:opacity-50"
            >
              {busy
                ? "Please wait..."
                : isRegister
                  ? "Create account"
                  : "Continue"}

              {!busy && (
                <span className="transition group-hover:translate-x-1">→</span>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-white/40">
            {isRegister ? "Already have an account?" : "New to DownBot?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isRegister ? "login" : "register")}
              className="font-semibold text-lime-300 hover:text-lime-200"
            >
              {isRegister ? "Sign in" : "Create an account"}
            </button>
          </p>
        </section>

        <p className="mt-7 text-center text-[10px] tracking-wide text-white/25">
          Your conversations. Your context. One intelligent workspace.
        </p>
      </div>
    </main>
  );
}