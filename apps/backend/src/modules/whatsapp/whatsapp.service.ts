import { AppSettings, Complaint } from "@prisma/client";

type ReadyForCollectionVariables = {
  customerName: string;
  complaintId: string;
  device: string;
  totalAmount: string;
  balanceDue: string;
  shopName: string;
};

export type WhatsappNotificationPreview = {
  channel: "whatsapp";
  mode: "mock";
  status: "sent" | "skipped";
  templateName: "device_ready_collection";
  recipientPhone: string;
  message: string;
  variables: ReadyForCollectionVariables;
  reason?: string;
};

export class WhatsappService {
  async sendReadyForCollectionNotification(
    complaint: Complaint,
    settings: AppSettings
  ): Promise<WhatsappNotificationPreview> {
    const recipientPhone = complaint.ownerPhone ?? complaint.customerPhone;
    const customerName = complaint.ownerName ?? complaint.customerName;
    const device = [complaint.deviceBrand, complaint.deviceModel].filter(Boolean).join(" ");
    const totalAmount = this.formatAmount(complaint.estimatedCost);
    const balanceDue = this.formatAmount(Math.max(complaint.estimatedCost - complaint.advancePaid, 0));

    const variables: ReadyForCollectionVariables = {
      customerName,
      complaintId: complaint.complaintId,
      device,
      totalAmount,
      balanceDue,
      shopName: settings.shopName,
    };

    const message = [
      `Hi ${variables.customerName}, your ${variables.device} issue is solved.`,
      `Complaint ${variables.complaintId} is ready for collection.`,
      `Total: ${variables.totalAmount}. Balance due: ${variables.balanceDue}.`,
      `Kindly collect the device from ${variables.shopName}.`,
    ].join(" ");

    const preview: WhatsappNotificationPreview = {
      channel: "whatsapp",
      mode: "mock",
      status: settings.enableWhatsappNotifications ? "sent" : "skipped",
      templateName: "device_ready_collection",
      recipientPhone,
      message,
      variables,
      reason: settings.enableWhatsappNotifications
        ? undefined
        : "WhatsApp notifications are disabled in Settings.",
    };

    if (preview.status === "sent") {
      console.info("[WhatsApp MOCK] Ready-for-collection template would be sent", preview);
    } else {
      console.info("[WhatsApp MOCK] Ready-for-collection template skipped", preview);
    }

    return preview;
  }

  private formatAmount(amount: number) {
    return `Rs. ${amount.toLocaleString("en-IN")}`;
  }
}
