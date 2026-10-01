import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import Landing from "@/components/Landing";
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
  if (!user) return <Landing />;
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

  const savingsRate =
    thisMonth.income > 0
      ? Math.round(((thisMonth.income - thisMonth.expense) / thisMonth.income) * 100)
      : 0;

  const monthLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-indigo-300">{monthLabel}</p>
          <h2 className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Welcome back, {user.name.split(" ")[0]}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Here is how your money looks this month.
          </p>
        </div>
        <Link href="/transactions" className="btn-primary">
          View transactions
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Balance"
          amount={formatMoney(allTime.balance)}
          icon={Wallet}
          tone="hero"
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
        <StatCard
          title="Savings rate"
          amount={`${savingsRate}%`}
          icon={PiggyBank}
          tone="sky"
          hint="Of this month's income"
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
            className="text-sm font-medium text-indigo-300 hover:underline"
          >
            See all
          </Link>
        }
      >
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No transactions yet. Add your first one.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {recent.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    t.type === "INCOME"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-rose-400/15 text-rose-300"
                  }`}
                >
                  {t.type === "INCOME" ? (
                    <ArrowUpRight size={18} />
                  ) : (
                    <ArrowDownRight size={18} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-100">{t.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    {t.category.name} · {formatDate(t.date.toISOString())}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    t.type === "INCOME" ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {t.type === "INCOME" ? "+" : "-"}
                  {formatMoney(Number(t.amount))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}