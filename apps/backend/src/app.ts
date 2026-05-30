import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "./common/middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import partyRoutes from "./modules/parties/party.routes";
import complaintRoutes from "./modules/complaints/complaint.routes";
import userRoutes from "./modules/users/user.routes";
import settingsRoutes from "./modules/settings/settings.routes";
import type { HonoVariables } from "./types/hono";

const app = new Hono<{ Variables: HonoVariables }>();

// Standard Production Middlewares
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));
app.use("/*", logger());

// Health Check API
app.get("/health", (c) =>
  c.json({ status: "OK", timestamp: new Date().toISOString() })
);

// App Router Registry
app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/parties", partyRoutes);
app.route("/api/v1/complaints", complaintRoutes);
app.route("/api/v1/users", userRoutes);
app.route("/api/v1/settings", settingsRoutes);

// Global Error Handler
app.onError(errorHandler);

// 404 handler
app.notFound((c) =>
  c.json({ success: false, error: { message: "Route not found" } }, 404)
);

export default app;
