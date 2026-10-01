"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Wallet,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-900/50">
        <Wallet size={18} />
      </span>
      <span className="text-lg font-bold text-white">ExpenseTracker</span>
    </div>
  );
}

export default function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur md:hidden">
        <Brand />
        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`rounded-lg p-2 ${
                isActive(href)
                  ? "bg-white/15 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon size={20} />
            </Link>
          ))}
          <button
            onClick={logout}
            aria-label="Log out"
            className="rounded-lg p-2 text-slate-400 hover:text-rose-300"
          >
            <LogOut size={20} />
          </button>
        </nav>
      </header>

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-slate-950/60 p-5 backdrop-blur md:flex">
        <div className="mb-8 mt-1">
          <Brand />
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive(href)
                  ? "bg-gradient-to-r from-indigo-500/25 to-violet-500/10 text-white ring-1 ring-indigo-400/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </span>
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">
            {userName}
          </p>
          <button
            onClick={logout}
            aria-label="Log out"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-rose-300"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}