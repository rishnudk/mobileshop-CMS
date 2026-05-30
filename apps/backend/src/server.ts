import * as dotenv from "dotenv";
// Load env before other imports
dotenv.config();

import { serve } from "@hono/node-server";
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  () => {
    console.log(`=================================`);
    console.log(`🚀 Mobile CMS Backend Online!`);
    console.log(`🚀 Running in ${process.env.NODE_ENV || "development"} mode`);
    console.log(`🚀 Listening on http://localhost:${PORT}`);
    console.log(`=================================`);
  }
);
