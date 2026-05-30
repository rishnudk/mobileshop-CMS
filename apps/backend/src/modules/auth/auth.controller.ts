import { Context } from "hono";
import { AuthService } from "./auth.service";
import { loginSchema } from "@mobileshop/shared";
import type { HonoVariables } from "../../types/hono";

type Ctx = Context<{ Variables: HonoVariables }>;

export class AuthController {
  private authService = new AuthService();

  login = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = loginSchema.safeParse(body);
      if (!parseResult.success) {
        return c.json(
          {
            success: false,
            error: {
              message: "Validation failed",
              details: parseResult.error.flatten().fieldErrors,
            },
          },
          400
        );
      }

      const result = await this.authService.login(parseResult.data);
      return c.json({ success: true, data: result }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Login failed" } },
        400
      );
    }
  };

  getMe = async (c: Ctx): Promise<Response> => {
    try {
      const user = c.get("user");
      if (!user) {
        return c.json(
          { success: false, error: { message: "Unauthorized" } },
          401
        );
      }

      const result = await this.authService.getMe(user.id);
      return c.json({ success: true, data: result }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to retrieve user details" } },
        400
      );
    }
  };
}
