import { prisma } from "@/lib/prisma";

export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      ok: true,
      database: "connected",
    };
  } catch (error) {
    console.error("Database health check failed:", error);

    return {
      ok: false,
      database: "disconnected",
    };
  }
}