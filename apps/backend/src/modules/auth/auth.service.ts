import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";
import { LoginInput } from "@mobileshop/shared";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export class AuthService {
  private authRepository = new AuthRepository();

  async login(input: LoginInput) {
    const user = await this.authRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
