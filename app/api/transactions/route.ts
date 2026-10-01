import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { parseTransactionBody, categoryError } from "@/lib/transactionHelpers";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const categoryId = searchParams.get("categoryId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);

  const where: Prisma.TransactionWhereInput = { userId: user.id };

  if (type === "INCOME" || type === "EXPENSE") where.type = type;
  if (categoryId) where.categoryId = categoryId;

  const dateFilter: Prisma.DateTimeFilter = {};
  if (from) {
    const d = new Date(from);
    if (isNaN(d.getTime())) {
      return NextResponse.json({ error: "Invalid from date" }, { status: 400 });
    }
    dateFilter.gte = d;
  }
  if (to) {
    const d = new Date(to);
    if (isNaN(d.getTime())) {
      return NextResponse.json({ error: "Invalid to date" }, { status: 400 });
    }
    dateFilter.lte = d;
  }
  if (from || to) where.date = dateFilter;

  const transactions = await prisma.transaction.findMany({
    where,
    include: { category: true },
    orderBy: { date: "desc" },
    take: limit,
  });

  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = parseTransactionBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const problem = await categoryError(
    user.id,
    parsed.data.categoryId,
    parsed.data.type
  );
  if (problem) {
    return NextResponse.json({ error: problem }, { status: 400 });
  }

  const transaction = await prisma.transaction.create({
    data: { ...parsed.data, userId: user.id },
    include: { category: true },
  });

  return NextResponse.json(transaction, { status: 201 });
}