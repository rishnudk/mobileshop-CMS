import { Context } from "hono";

export function errorHandler(err: Error, c: Context): Response {
  console.error("Hono Error Handler Captured:", err);

  const status = (err as any).status || 500;
  const message = err.message || "An unexpected server error occurred";

  return c.json(
    {
      success: false,
      error: {
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      },
    },
    status
  );
}
