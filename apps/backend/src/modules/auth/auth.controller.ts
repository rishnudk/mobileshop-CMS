import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { loginSchema } from "@mobileshop/shared";
import { AuthenticatedRequest } from "../../common/middleware/auth.middleware";

export class AuthController {
  private authService = new AuthService();

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate schema
      const parseResult = loginSchema.safeParse(req.body);
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

      const result = await this.authService.login(parseResult.data);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { message: error.message || "Login failed" },
      });
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthenticatedRequest;
      if (!authReq.user) {
        res.status(401).json({
          success: false,
          error: { message: "Unauthorized" },
        });
        return;
      }

      const result = await this.authService.getMe(authReq.user.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { message: error.message || "Failed to retrieve user details" },
      });
    }
  };
}
