import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const type = body.type;

  if (!name || name.length > 50) {
    return NextResponse.json(
      { error: "Name is required, max 50 characters" },
      { status: 400 }
    );
  }
  if (type !== "INCOME" && type !== "EXPENSE") {
    return NextResponse.json(
      { error: "Type must be INCOME or EXPENSE" },
      { status: 400 }
    );
  }

  const exists = await prisma.category.findFirst({
    where: { userId: user.id, name, type },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({
    data: { name, type, userId: user.id },
  });

  return NextResponse.json(category, { status: 201 });
}