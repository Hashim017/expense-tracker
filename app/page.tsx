import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import {
  getTotals,
  getMonthly,
  getCategoryBreakdown,
  monthStart,
} from "@/lib/stats";
import { formatMoney, formatDate } from "@/lib/format";
import StatCard from "@/components/StatCard";
import Card from "@/components/Card";
import SpendingChart from "@/components/SpendingChart";
import CategoryChart from "@/components/CategoryChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return <p>No user found. Run the seed first.</p>;

  const start = monthStart(0);

  const [allTime, thisMonth, monthly, breakdown, recent] = await Promise.all([
    getTotals(user.id),
    getTotals(user.id, start),
    getMonthly(user.id, 6),
    getCategoryBreakdown(user.id, start),
    prisma.transaction.findMany({
      where: { userId: user.id },
      include: { category: true },
      orderBy: { date: "desc" },
      take: 6,
    }),
  ]);

  const firstName = user.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {firstName}
          </h2>
          <p className="text-sm text-slate-500">
            Here is how your money looks this month.
          </p>
        </div>
        <Link
          href="/transactions"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          View transactions
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Balance"
          amount={formatMoney(allTime.balance)}
          icon={Wallet}
          tone="indigo"
          hint="All time"
        />
        <StatCard
          title="Income"
          amount={formatMoney(thisMonth.income)}
          icon={TrendingUp}
          tone="green"
          hint="This month"
        />
        <StatCard
          title="Expenses"
          amount={formatMoney(thisMonth.expense)}
          icon={TrendingDown}
          tone="red"
          hint="This month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Income vs Expenses" className="lg:col-span-2">
          <SpendingChart data={monthly} />
        </Card>
        <Card title="Spending by category">
          <CategoryChart data={breakdown} />
        </Card>
      </div>

      <Card
        title="Recent transactions"
        action={
          <Link
            href="/transactions"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            See all
          </Link>
        }
      >
        <ul className="divide-y divide-slate-100">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center gap-3 py-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  t.type === "INCOME"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }`}
              >
                {t.type === "INCOME" ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{t.title}</p>
                <p className="truncate text-xs text-slate-500">
                  {t.category.name} · {formatDate(t.date.toISOString())}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  t.type === "INCOME" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {t.type === "INCOME" ? "+" : "-"}
                {formatMoney(Number(t.amount))}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}