import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import TransactionManager from "@/components/TransactionManager";

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const user = await getCurrentUser();
  if (!user) return <p>No user found. Run the seed first.</p>;

  const [transactions, categories] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId: user.id },
      include: { category: true },
      orderBy: { date: "desc" },
      take: 200,
    }),
    prisma.category.findMany({
      where: { userId: user.id },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <TransactionManager
      transactions={transactions.map((t) => ({
        id: t.id,
        title: t.title,
        amount: Number(t.amount),
        type: t.type,
        date: t.date.toISOString(),
        note: t.note,
        categoryId: t.categoryId,
        categoryName: t.category.name,
      }))}
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        type: c.type,
      }))}
    />
  );
}