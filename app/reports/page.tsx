import Link from "next/link";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { getCurrentUser } from "@/lib/currentUser";
import {
  getTotals,
  getMonthly,
  getCategoryBreakdown,
  monthStart,
} from "@/lib/stats";
import { formatMoney } from "@/lib/format";
import StatCard from "@/components/StatCard";
import Card from "@/components/Card";
import SpendingChart from "@/components/SpendingChart";
import CategoryChart from "@/components/CategoryChart";

export const dynamic = "force-dynamic";

const RANGES = [3, 6, 12];

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range } = await searchParams;
  const months = RANGES.includes(Number(range)) ? Number(range) : 6;

  const user = await getCurrentUser();
  if (!user) return <p>No user found. Run the seed first.</p>;

  const start = monthStart(months - 1);

  const [totals, monthly, breakdown] = await Promise.all([
    getTotals(user.id, start),
    getMonthly(user.id, months),
    getCategoryBreakdown(user.id, start),
  ]);

  const savingsRate =
    totals.income > 0 ? Math.round((totals.balance / totals.income) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-sm text-slate-500">
            Your income and spending over time.
          </p>
        </div>
        <div className="flex rounded-lg bg-slate-200/70 p-1 text-sm">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`/reports?range=${r}`}
              className={`rounded-md px-3 py-1.5 font-medium ${
                months === r
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {r} months
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total income"
          amount={formatMoney(totals.income)}
          icon={TrendingUp}
          tone="green"
          hint={`Last ${months} months`}
        />
        <StatCard
          title="Total expenses"
          amount={formatMoney(totals.expense)}
          icon={TrendingDown}
          tone="red"
          hint={`Last ${months} months`}
        />
        <StatCard
          title="Net savings"
          amount={formatMoney(totals.balance)}
          icon={Wallet}
          tone="indigo"
          hint={`${savingsRate}% savings rate`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Monthly overview" className="lg:col-span-2">
          <SpendingChart data={monthly} />
        </Card>
        <Card title="Expenses by category">
          <CategoryChart data={breakdown} />
        </Card>
      </div>

      <Card title="Month by month">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-2 font-medium">Month</th>
                <th className="py-2 text-right font-medium">Income</th>
                <th className="py-2 text-right font-medium">Expenses</th>
                <th className="py-2 text-right font-medium">Net</th>
              </tr>
            </thead>
            <tbody>
              {[...monthly].reverse().map((m) => {
                const net = m.income - m.expense;
                return (
                  <tr key={m.month} className="border-t border-slate-100">
                    <td className="py-3 font-medium">{m.month}</td>
                    <td className="py-3 text-right text-emerald-600">
                      {formatMoney(m.income)}
                    </td>
                    <td className="py-3 text-right text-rose-600">
                      {formatMoney(m.expense)}
                    </td>
                    <td
                      className={`py-3 text-right font-semibold ${
                        net >= 0 ? "text-slate-900" : "text-rose-600"
                      }`}
                    >
                      {formatMoney(net)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}