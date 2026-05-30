import { Context } from "hono";
import { appSettingsSchema } from "@mobileshop/shared";
import { SettingsService } from "./settings.service";
import type { HonoVariables } from "../../types/hono";

type Ctx = Context<{ Variables: HonoVariables }>;

export class SettingsController {
  private settingsService = new SettingsService();

  getSettings = async (c: Ctx): Promise<Response> => {
    try {
      const settings = await this.settingsService.getSettings();
      return c.json({ success: true, data: settings }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to fetch settings" } },
        500
      );
    }
  };

  updateSettings = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = appSettingsSchema.safeParse(body);
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

      const settings = await this.settingsService.updateSettings(parseResult.data);
      return c.json({ success: true, data: settings }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to update settings" } },
        500
      );
    }
  };
}
