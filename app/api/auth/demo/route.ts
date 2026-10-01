import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST() {
  const user = await prisma.user.findUnique({
    where: { email: "demo@example.com" },
  });

  if (!user) {
    return NextResponse.json({ error: "Demo user not found" }, { status: 404 });
  }

  await createSession(user.id);
  return NextResponse.json({ success: true });
}