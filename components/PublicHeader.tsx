import Link from "next/link";
import { Wallet } from "lucide-react";

export default function PublicHeader() {
  return (
    <header className="sticky top-3 z-30 mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-900/50">
          <Wallet size={18} />
        </span>
        <span className="text-lg font-bold text-white">ExpenseTracker</span>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
        >
          Log in
        </Link>
        <Link href="/register" className="btn-primary">
          Get started
        </Link>
      </div>
    </header>
  );
}