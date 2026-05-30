import * as bcrypt from "bcryptjs";
import { CreateUserInput, UpdateUserInput } from "@mobileshop/shared";

import { UserRepository } from "./user.repository";

export class UserService {
  private userRepository = new UserRepository();

  async getUsers() {
    return this.userRepository.findMany();
  }

  async createUser(input: CreateUserInput) {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    return this.userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
      phone: input.phone ?? null,
      isActive: input.isActive ?? true,
    });
  }

  async updateUser(id: string, input: UpdateUserInput) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    if (input.email && input.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        throw new Error("A user with this email already exists.");
      }
    }

    return this.userRepository.update(id, {
      name: input.name,
      email: input.email,
      role: input.role,
      phone: input.phone,
      isActive: input.isActive,
    });
  }

  async deleteUser(id: string, currentUserId: string) {
    if (id === currentUserId) {
      throw new Error("Admin cannot delete their own account.");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    return this.userRepository.delete(id);
  }
}
