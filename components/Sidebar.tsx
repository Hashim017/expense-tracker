import Link from "next/link";
import { LayoutDashboard, ArrowLeftRight, BarChart3 } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 flex-col bg-slate-900 text-slate-200 min-h-screen p-5">
      <h1 className="text-xl font-bold text-white mb-8">ExpenseTracker</h1>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-800"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}