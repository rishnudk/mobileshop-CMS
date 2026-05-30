import { NextFunction, Response } from "express";

import { AuthenticatedRequest } from "./auth.middleware";

export function requireRoles(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { message: "Unauthorized" },
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: { message: "You do not have permission to perform this action." },
      });
      return;
    }

    next();
  };
}
