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

export function initDb(rawUrl: string) {
  if (!_client) {
    let url = rawUrl;
    if (!url) throw new Error("DATABASE_URL is required.");
    
    // Cloudflare Dashboard secrets sometimes get saved with literal quotes if copy-pasted directly from a .env file.
    // pg-connection-string will fail to parse this and default to localhost, causing "No database host..." errors.
    if (url.startsWith('"') && url.endsWith('"')) {
      url = url.slice(1, -1);
    }
    if (url.startsWith("'") && url.endsWith("'")) {
      url = url.slice(1, -1);
    }
    
    _client = new PrismaClient({ adapter: new PrismaNeon({ connectionString: url }) });
  }
  return _client;
}

function getClient(): PrismaClient {
  if (!_client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required.");
    initDb(url);
  }
  return _client!;
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
