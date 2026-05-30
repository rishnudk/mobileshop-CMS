import { AppSettingsInput } from "@mobileshop/shared";

import { SettingsRepository } from "./settings.repository";

export class SettingsService {
  private settingsRepository = new SettingsRepository();

  async getSettings() {
    let settings = await this.settingsRepository.findFirst();

    if (!settings) {
      settings = await this.settingsRepository.create({
        shopName: "MobileShop CMS",
        shopPhone: "+919876543210",
        shopAddress: "Main Market Road, Bengaluru",
        complaintPrefix: "CMP",
        defaultCurrency: "INR",
        enableWhatsappNotifications: false,
      });
    }

    return settings;
  }

  async updateSettings(input: AppSettingsInput) {
    const existing = await this.getSettings();

    return this.settingsRepository.update(existing.id, input);
  }
}
