import { NextFunction, Request, Response } from "express";
import { appSettingsSchema } from "@mobileshop/shared";

import { SettingsService } from "./settings.service";

export class SettingsController {
  private settingsService = new SettingsService();

  getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const settings = await this.settingsService.getSettings();
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  };

  updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parseResult = appSettingsSchema.safeParse(req.body);
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

      const settings = await this.settingsService.updateSettings(parseResult.data);
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  };
}
