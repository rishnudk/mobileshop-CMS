import { Prisma } from "@prisma/client";
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
}
