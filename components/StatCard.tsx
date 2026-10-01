import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  amount: string;
  icon: LucideIcon;
  tone: "green" | "red" | "indigo";
  hint?: string;
};

const tones = {
  green: { box: "bg-emerald-100 text-emerald-600", text: "text-emerald-600" },
  red: { box: "bg-rose-100 text-rose-600", text: "text-rose-600" },
  indigo: { box: "bg-indigo-100 text-indigo-600", text: "text-slate-900" },
};

export default function StatCard({ title, amount, icon: Icon, tone, hint }: Props) {
  const t = tones[tone];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.box}`}
        >
          <Icon size={20} />
        </span>
      </div>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${t.text}`}>{amount}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}