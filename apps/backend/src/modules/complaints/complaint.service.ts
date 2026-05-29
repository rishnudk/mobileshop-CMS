import { CreatePartyComplaintInput } from "@mobileshop/shared";
import { ComplaintRepository } from "./complaint.repository";
import { PartyRepository } from "../parties/party.repository";

export class ComplaintService {
  private complaintRepository = new ComplaintRepository();
  private partyRepository = new PartyRepository();

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
}
