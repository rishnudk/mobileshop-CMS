import { Prisma } from "@prisma/client";
import prisma from "../../config/db";

export class PartyRepository {
  async findMany() {
    return prisma.party.findMany({
      include: {
        _count: {
          select: {
            complaints: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.party.findUnique({
      where: { id },
      include: {
        complaints: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            assignedTechnician: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            complaints: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.PartyCreateInput) {
    return prisma.party.create({
      data,
    });
  }
}
