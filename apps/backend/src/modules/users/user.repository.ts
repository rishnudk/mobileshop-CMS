import prisma from "../../config/db";

export class UserRepository {
  async findMany() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            complaints: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            complaints: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "STAFF" | "TECHNICIAN";
    phone?: string | null;
    isActive?: boolean;
  }) {
    return prisma.user.create({ data });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      role: "ADMIN" | "STAFF" | "TECHNICIAN";
      phone: string | null;
      isActive: boolean;
    }>
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
