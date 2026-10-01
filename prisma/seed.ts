import { PrismaClient, TransactionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: "demo@example.com" },
  });
  if (existing) {
    console.log("Seed data already exists");
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@example.com",
      passwordHash: await bcrypt.hash("password123", 10),
    },
  });

  const categoryList = [
    { name: "Salary", type: TransactionType.INCOME },
    { name: "Freelance", type: TransactionType.INCOME },
    { name: "Food", type: TransactionType.EXPENSE },
    { name: "Transport", type: TransactionType.EXPENSE },
    { name: "Utilities", type: TransactionType.EXPENSE },
    { name: "Shopping", type: TransactionType.EXPENSE },
    { name: "Health", type: TransactionType.EXPENSE },
  ];

  const categories: Record<string, string> = {};
  for (const c of categoryList) {
    const created = await prisma.category.create({
      data: { ...c, userId: user.id },
    });
    categories[c.name] = created.id;
  }

  const now = new Date();
  const monthDate = (monthsAgo: number, day: number) =>
    new Date(Date.UTC(now.getFullYear(), now.getMonth() - monthsAgo, day));

  const transactions: {
    title: string;
    amount: number;
    type: TransactionType;
    date: Date;
    categoryId: string;
  }[] = [];

  for (let m = 0; m < 6; m++) {
    transactions.push(
      { title: "Salary", amount: 5000, type: TransactionType.INCOME, date: monthDate(m, 1), categoryId: categories["Salary"] },
      { title: "Groceries", amount: 180 + m * 10, type: TransactionType.EXPENSE, date: monthDate(m, 2), categoryId: categories["Food"] },
      { title: "Fuel", amount: 60 + m * 5, type: TransactionType.EXPENSE, date: monthDate(m, 3), categoryId: categories["Transport"] },
      { title: "Electricity bill", amount: 95 + m * 8, type: TransactionType.EXPENSE, date: monthDate(m, 4), categoryId: categories["Utilities"] },
      { title: "Shopping", amount: 120 + m * 15, type: TransactionType.EXPENSE, date: monthDate(m, 5), categoryId: categories["Shopping"] }
    );
    if (m % 2 === 0) {
      transactions.push({
        title: "Freelance work",
        amount: 400 + m * 50,
        type: TransactionType.INCOME,
        date: monthDate(m, 6),
        categoryId: categories["Freelance"],
      });
    }
  }

  await prisma.transaction.createMany({
    data: transactions.map((t) => ({ ...t, userId: user.id })),
  });

  console.log("Seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());