import { prisma } from "@/lib/prisma";

export type TransactionInput = {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: Date;
  note: string | null;
  categoryId: string;
};

export function parseTransactionBody(
  body: unknown
): { data: TransactionInput } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid body" };
  const b = body as Record<string, unknown>;

  const title = String(b.title ?? "").trim();
  if (!title || title.length > 100) {
    return { error: "Title is required, max 100 characters" };
  }

  const amount = Number(b.amount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 999999999) {
    return { error: "Amount must be a number above 0" };
  }

  const type = b.type;
  if (type !== "INCOME" && type !== "EXPENSE") {
    return { error: "Type must be INCOME or EXPENSE" };
  }

  const date = b.date ? new Date(String(b.date)) : new Date();
  if (isNaN(date.getTime())) return { error: "Invalid date" };

  const categoryId = String(b.categoryId ?? "");
  if (!categoryId) return { error: "Category is required" };

  const note = b.note ? String(b.note).slice(0, 250) : null;

  return { data: { title, amount, type, date, note, categoryId } };
}

export async function categoryError(
  userId: string,
  categoryId: string,
  type: "INCOME" | "EXPENSE"
) {
  const category = await prisma.category.findFirst({
    where: { id: categoryId, userId },
  });
  if (!category) return "Category not found";
  if (category.type !== type) return "Category type does not match";
  return null;
}