import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  amount: string;
  icon: LucideIcon;
  tone: "hero" | "green" | "red" | "sky";
  hint?: string;
};

const tones = {
  hero: {
    wrap: "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-900/40",
    icon: "bg-white/20 text-white",
    title: "text-indigo-100",
    amount: "text-white",
    hint: "text-indigo-100/80",
  },
  green: {
    wrap: "card",
    icon: "bg-emerald-400/15 text-emerald-300",
    title: "text-slate-400",
    amount: "text-emerald-300",
    hint: "text-slate-500",
  },
  red: {
    wrap: "card",
    icon: "bg-rose-400/15 text-rose-300",
    title: "text-slate-400",
    amount: "text-rose-300",
    hint: "text-slate-500",
  },
  sky: {
    wrap: "card",
    icon: "bg-sky-400/15 text-sky-300",
    title: "text-slate-400",
    amount: "text-sky-300",
    hint: "text-slate-500",
  },
};

export default function StatCard({ title, amount, icon: Icon, tone, hint }: Props) {
  const t = tones[tone];
  return (
    <div
      className={`rounded-2xl p-5 transition hover:-translate-y-0.5 ${t.wrap}`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${t.title}`}>{title}</p>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.icon}`}
        >
          <Icon size={20} />
        </span>
      </div>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${t.amount}`}>
        {amount}
      </p>
      {hint && <p className={`mt-1 text-xs ${t.hint}`}>{hint}</p>}
    </div>
  );
}