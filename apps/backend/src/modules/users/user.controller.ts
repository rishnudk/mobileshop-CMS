import { NextFunction, Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "@mobileshop/shared";

import { AuthenticatedRequest } from "../../common/middleware/auth.middleware";
import { UserService } from "./user.service";

export class UserController {
  private userService = new UserService();

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parseResult = createUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({
          success: false,
          error: {
            message: "Validation failed",
            details: parseResult.error.flatten().fieldErrors,
          },
        });
        return;
      }

      const user = await this.userService.createUser(parseResult.data);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parseResult = updateUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({
          success: false,
          error: {
            message: "Validation failed",
            details: parseResult.error.flatten().fieldErrors,
          },
        });
        return;
      }

      const user = await this.userService.updateUser(req.params.id, parseResult.data);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthenticatedRequest;
      const currentUserId = authReq.user?.id;

      if (!currentUserId) {
        res.status(401).json({
          success: false,
          error: { message: "Unauthorized" },
        });
        return;
      }

      await this.userService.deleteUser(req.params.id, currentUserId);
      res.status(200).json({
        success: true,
        data: { message: "User deleted successfully." },
      });
    } catch (error) {
      next(error);
    }
  };
}
