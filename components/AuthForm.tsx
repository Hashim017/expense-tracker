"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isLogin ? { email, password } : { name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
      <div className="flex min-h-[75vh] items-center justify-center  py-10">
      <div className="card w-full max-w-md p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-900/50">
            <Wallet size={22} />
          </span>
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {isLogin
              ? "Log in to see your finances."
              : "Start tracking your money in minutes."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              required
              type="password"
              minLength={isLogin ? undefined : 8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            {!isLogin && (
              <p className="mt-1 text-xs text-slate-500">At least 8 characters.</p>
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? "Please wait..." : isLogin ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          {isLogin ? "No account yet? " : "Already have an account? "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-medium text-indigo-300 hover:underline"
          >
            {isLogin ? "Register" : "Log in"}
          </Link>
        </p>

        {isLogin && (
          <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-center text-xs text-slate-400">
            Demo login: demo@example.com / password123
          </p>
        )}
      </div>
    </div>
  );
}