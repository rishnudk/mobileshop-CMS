import { CreatePartyComplaintInput } from "@mobileshop/shared";
import { ComplaintStatus } from "@prisma/client";
import { ComplaintRepository } from "./complaint.repository";
import { PartyRepository } from "../parties/party.repository";
import { UserRepository } from "../users/user.repository";
import { SettingsService } from "../settings/settings.service";
import { WhatsappNotificationPreview, WhatsappService } from "../whatsapp/whatsapp.service";

export type ComplaintStatusUpdateResult = {
  complaint: Awaited<ReturnType<ComplaintRepository["findById"]>>;
  notification: WhatsappNotificationPreview | null;
};

export class ComplaintService {
  private complaintRepository = new ComplaintRepository();
  private partyRepository = new PartyRepository();
  private userRepository = new UserRepository();
  private settingsService = new SettingsService();
  private whatsappService = new WhatsappService();

  async getComplaints() {
    return this.complaintRepository.findMany();
  }

  async createComplaintForParty(partyId: string, input: CreatePartyComplaintInput) {
    const party = await this.partyRepository.findById(partyId);
    if (!party) {
      throw new Error("Party not found");
    }

    const complaintId = await this.generateComplaintId();
    const customerName = party.type === "INDIVIDUAL" ? party.name : input.ownerName;
    const customerPhone = party.type === "INDIVIDUAL" ? party.phone : input.ownerPhone;

    return this.complaintRepository.create({
      complaintId,
      party: {
        connect: {
          id: party.id,
        },
      },
      customerName,
      customerPhone,
      ownerName: input.ownerName,
      ownerPhone: input.ownerPhone,
      deviceBrand: input.deviceBrand,
      deviceModel: input.deviceModel,
      deviceColor: input.deviceColor ?? null,
      imei: input.imei ?? null,
      issueDescription: input.issueDescription,
      accessoriesReceived: input.accessoriesReceived ?? null,
      deviceCondition: input.deviceCondition ?? null,
      estimatedCost: input.estimatedCost,
      advancePaid: input.advancePaid,
      assignedTechnician: input.assignedTechnicianId
        ? {
            connect: {
              id: input.assignedTechnicianId,
            },
          }
        : undefined,
      logs: {
        create: {
          newStatus: "PENDING",
          updatedBy: "system",
        },
      },
    });
  }

  private async generateComplaintId() {
    const latestComplaint = await this.complaintRepository.getLatestComplaint();
    const latestNumber = latestComplaint?.complaintId.match(/\d+$/)?.[0];
    const nextNumber = latestNumber ? Number(latestNumber) + 1 : 2001;

    return `CMP-${String(nextNumber).padStart(4, "0")}`;
  }

  async assignTechnician(complaintId: string, assignedTechnicianId: string | null, updatedBy: string) {
    const complaint = await this.complaintRepository.findById(complaintId);
    if (!complaint) {
      throw new Error("Complaint not found.");
    }

    if (assignedTechnicianId) {
      const technician = await this.userRepository.findById(assignedTechnicianId);
      if (!technician) {
        throw new Error("Technician not found.");
      }

      if (technician.role !== "TECHNICIAN") {
        throw new Error("Only technicians can be assigned to complaints.");
      }

      if (!technician.isActive) {
        throw new Error("Inactive technicians cannot be assigned.");
      }
    }

    return this.complaintRepository.updateAssignment(complaintId, assignedTechnicianId, updatedBy);
  }

  async updateStatus(
    complaintId: string,
    status: ComplaintStatus,
    updatedBy: string
  ): Promise<ComplaintStatusUpdateResult> {
    const complaint = await this.complaintRepository.findById(complaintId);
    if (!complaint) {
      throw new Error("Complaint not found.");
    }

    if (complaint.status === status) {
      return {
        complaint,
        notification: null,
      };
    }

    const updatedComplaint = await this.complaintRepository.updateStatus(complaintId, status, updatedBy);
    let notification: WhatsappNotificationPreview | null = null;

    if (status === "READY") {
      const settings = await this.settingsService.getSettings();
      notification = await this.whatsappService.sendReadyForCollectionNotification(updatedComplaint, settings);
    }

    return {
      complaint: updatedComplaint,
      notification,
    };
  }
}
