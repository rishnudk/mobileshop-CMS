import { Context, Next } from "hono";
import * as jwt from "jsonwebtoken";
import type { HonoVariables } from "../../types/hono";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export async function authMiddleware(
  c: Context<{ Variables: HonoVariables }>,
  next: Next
) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      { success: false, error: { message: "Access denied. No token provided." } },
      401
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.json(
      { success: false, error: { message: "Invalid or expired session token." } },
      401
    );
  }
}
