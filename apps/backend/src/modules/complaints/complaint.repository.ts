import { ComplaintStatus, Prisma } from "@prisma/client";
import prisma from "../../config/db";

export class ComplaintRepository {
  async findMany() {
    return prisma.complaint.findMany({
      include: {
        party: true,
        assignedTechnician: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getLatestComplaint() {
    return prisma.complaint.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        complaintId: true,
      },
    });
  }

  async create(data: Prisma.ComplaintCreateInput) {
    return prisma.complaint.create({
      data,
      include: {
        party: true,
        assignedTechnician: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.complaint.findUnique({
      where: { id },
      include: {
        party: true,
        assignedTechnician: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async updateAssignment(id: string, assignedTechnicianId: string | null, updatedBy: string) {
    const currentComplaint = await prisma.complaint.findUnique({
      where: { id },
      select: {
        status: true,
      },
    });

    return prisma.complaint.update({
      where: { id },
      data: {
        assignedTechnicianId,
        logs: {
          create: {
            oldStatus: currentComplaint?.status,
            newStatus: currentComplaint?.status ?? "PENDING",
            updatedBy,
          },
        },
      },
      include: {
        party: true,
        assignedTechnician: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async updateStatus(id: string, status: ComplaintStatus, updatedBy: string) {
    const currentComplaint = await prisma.complaint.findUnique({
      where: { id },
      select: {
        status: true,
      },
    });

    return prisma.complaint.update({
      where: { id },
      data: {
        status,
        logs: {
          create: {
            oldStatus: currentComplaint?.status,
            newStatus: status,
            updatedBy,
          },
        },
      },
      include: {
        party: true,
        assignedTechnician: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }
}
