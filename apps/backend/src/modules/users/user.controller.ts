import { Context } from "hono";
import { createUserSchema, updateUserSchema } from "@mobileshop/shared";
import { UserService } from "./user.service";
import type { HonoVariables } from "../../types/hono";

type Ctx = Context<{ Variables: HonoVariables }>;

export class UserController {
  private userService = new UserService();

  getUsers = async (c: Ctx): Promise<Response> => {
    try {
      const users = await this.userService.getUsers();
      return c.json({ success: true, data: users }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to fetch users" } },
        500
      );
    }
  };

  createUser = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = createUserSchema.safeParse(body);
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

      const user = await this.userService.createUser(parseResult.data);
      return c.json({ success: true, data: user }, 201);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to create user" } },
        500
      );
    }
  };

  updateUser = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = updateUserSchema.safeParse(body);
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

      const user = await this.userService.updateUser(c.req.param("id")!, parseResult.data);
      return c.json({ success: true, data: user }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to update user" } },
        500
      );
    }
  };

  deleteUser = async (c: Ctx): Promise<Response> => {
    try {
      const user = c.get("user");
      if (!user) {
        return c.json(
          { success: false, error: { message: "Unauthorized" } },
          401
        );
      }

      await this.userService.deleteUser(c.req.param("id")!, user.id);
      return c.json({ success: true, data: { message: "User deleted successfully." } }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to delete user" } },
        500
      );
    }
  };
}
