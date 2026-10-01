import { prisma } from "@/lib/prisma";

export type MonthPoint = { month: string; income: number; expense: number };
export type CategoryPoint = { name: string; value: number };

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function monthStart(monthsAgo = 0) {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsAgo, 1)
  );
}

export async function getTotals(userId: string, from?: Date) {
  const grouped = await prisma.transaction.groupBy({
    by: ["type"],
    where: { userId, ...(from ? { date: { gte: from } } : {}) },
    _sum: { amount: true },
  });

  let income = 0;
  let expense = 0;
  for (const g of grouped) {
    const sum = Number(g._sum.amount ?? 0);
    if (g.type === "INCOME") income = sum;
    else expense = sum;
  }
  return { income, expense, balance: income - expense };
}

export async function getMonthly(
  userId: string,
  months: number
): Promise<MonthPoint[]> {
  const start = monthStart(months - 1);

  const rows = await prisma.transaction.findMany({
    where: { userId, date: { gte: start } },
    select: { amount: true, type: true, date: true },
  });

  const points: MonthPoint[] = [];
  for (let i = 0; i < months; i++) {
    const d = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1)
    );
    const label =
      MONTH_NAMES[d.getUTCMonth()] +
      (months > 6 ? ` ${String(d.getUTCFullYear()).slice(2)}` : "");
    points.push({ month: label, income: 0, expense: 0 });
  }

  for (const r of rows) {
    const idx =
      (r.date.getUTCFullYear() - start.getUTCFullYear()) * 12 +
      (r.date.getUTCMonth() - start.getUTCMonth());
    if (idx < 0 || idx >= months) continue;
    const amount = Number(r.amount);
    if (r.type === "INCOME") points[idx].income += amount;
    else points[idx].expense += amount;
  }

  return points;
}

export async function getCategoryBreakdown(
  userId: string,
  from: Date
): Promise<CategoryPoint[]> {
  const grouped = await prisma.transaction.groupBy({
    by: ["categoryId"],
    where: { userId, type: "EXPENSE", date: { gte: from } },
    _sum: { amount: true },
  });

  const categories = await prisma.category.findMany({ where: { userId } });
  const names = new Map(categories.map((c) => [c.id, c.name]));

  return grouped
    .map((g) => ({
      name: names.get(g.categoryId) ?? "Other",
      value: Number(g._sum.amount ?? 0),
    }))
    .sort((a, b) => b.value - a.value);
}