import Link from "next/link";
import { Wallet } from "lucide-react";

export default function PublicHeader() {
  return (
    <header className="sticky top-3 z-30 mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2.5 backdrop-blur sm:px-4 sm:py-3">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-900/50">
          <Wallet size={18} />
        </span>
        <span className="hidden text-base font-bold text-white min-[400px]:inline sm:text-lg">
          ExpenseTracker
        </span>
      </Link>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link
          href="/login"
          className="whitespace-nowrap rounded-lg border border-white/15 px-3.5 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 sm:border-transparent sm:px-3"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="btn-primary whitespace-nowrap px-3.5 py-2"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}