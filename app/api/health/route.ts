import { checkDatabaseHealth } from "@/lib/services/health";

export async function GET() {
  const health = await checkDatabaseHealth();

  return Response.json(health, {
    status: health.ok ? 200 : 503,
  });
}