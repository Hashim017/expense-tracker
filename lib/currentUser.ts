import { prisma } from "@/lib/prisma";

// Temporary. Stage 5 replaces this with the logged in user.
export async function getCurrentUser() {
  return prisma.user.findUnique({ where: { email: "demo@example.com" } });
}