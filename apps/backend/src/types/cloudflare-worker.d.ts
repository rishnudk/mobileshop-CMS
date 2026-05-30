declare module "@neondatabase/serverless" {
  export class Pool {
    constructor(config: { connectionString: string });
  }
}

declare module "cloudflare:node" {
  export function httpServerHandler(options: { port: number }): ExportedHandler;
}
