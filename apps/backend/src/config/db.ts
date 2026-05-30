import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

// In local Node.js development, @neondatabase/serverless needs an explicit
// WebSocket constructor to connect to Neon. Without it, the Pool falls back
// to native pg TCP defaults and ignores your DATABASE_URL entirely.
//
// In Cloudflare Workers, the runtime has a native WebSocket — no setup needed.
// We detect Node.js via process.versions.node, which CF Workers never sets
// even with the nodejs_compat flag.
if (typeof process !== "undefined" && process.versions?.node) {
  // neonConfig exists at runtime but isn't typed in @neondatabase/serverless v1.x types
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { neonConfig } = require("@neondatabase/serverless");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require("ws");
}

let _client: PrismaClient | null = null;

function getClient(): PrismaClient {
  if (!_client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required.");
    _client = new PrismaClient({ adapter: new PrismaNeon({ connectionString: url }) });
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
