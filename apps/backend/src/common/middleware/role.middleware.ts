import { Context, Next } from "hono";
import type { HonoVariables } from "../../types/hono";

export function requireRoles(...roles: string[]) {
  return async (c: Context<{ Variables: HonoVariables }>, next: Next) => {
    const user = c.get("user");

    if (!user) {
      return c.json(
        { success: false, error: { message: "Unauthorized" } },
        401
      );
    }

    if (!roles.includes(user.role)) {
      return c.json(
        { success: false, error: { message: "You do not have permission to perform this action." } },
        403
      );
    }

    await next();
  };
}
