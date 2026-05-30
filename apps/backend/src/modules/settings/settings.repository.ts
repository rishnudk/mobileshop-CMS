import prisma from "../../config/db";

export class SettingsRepository {
  async findFirst() {
    return prisma.appSettings.findFirst();
  }

  async create(data: {
    shopName: string;
    shopPhone: string;
    shopAddress: string;
    complaintPrefix: string;
    defaultCurrency: string;
    enableWhatsappNotifications: boolean;
  }) {
    return prisma.appSettings.create({ data });
  }

  async update(
    id: string,
    data: {
      shopName: string;
      shopPhone: string;
      shopAddress: string;
      complaintPrefix: string;
      defaultCurrency: string;
      enableWhatsappNotifications: boolean;
    }
  ) {
    return prisma.appSettings.update({
      where: { id },
      data,
    });
  }
}
