import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

let _client: PrismaClient | null = null;

function getClient(): PrismaClient {
  if (!_client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required.");
    const pool = new Pool({ connectionString: url });
    _client = new PrismaClient({ adapter: new PrismaNeon(pool) });
  }
  return _client;
}

// Lazy proxy — defers PrismaClient creation to the first actual request.
// This avoids reading process.env at module load time, which causes
// Cloudflare Workers startup validation to fail (error code 10021)
// because secrets are not injected during the validation phase.
const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return (getClient() as any)[prop as string];
  },
});

export default prisma;
