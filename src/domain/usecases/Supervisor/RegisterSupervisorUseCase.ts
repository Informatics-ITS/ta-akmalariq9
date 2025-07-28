import { ISupervisorRepository } from "../../repositories/ISupervisorRepository";
import { Supervisor } from "../../entities/Supervisor";
import { IResponse } from "../../../shared/utils/IResponse";
import bcrypt from "bcrypt";

export class RegisterSupervisorUseCase {
  constructor(private supervisorRepository: ISupervisorRepository) {}

  async execute(
    name: string,
    email: string,
    password: string,
    companyId: string
  ): Promise<IResponse<Supervisor | null>> {
    try {
      if (!name || !email || !password || !companyId) {
        return {
          error: true,
          message: "All fields are required",
          data: null,
        };
      }

      const isEmailExists = await this.supervisorRepository.isEmailExists(
        email
      );
      if (isEmailExists) {
        return {
          error: true,
          message: "Email already in use",
          data: null,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const supervisor = new Supervisor(
        "",
        "",
        companyId,
        name,
        email,
        hashedPassword
      );

      const createdSupervisor =
        await this.supervisorRepository.createSupervisor(supervisor);

      return {
        error: false,
        message: "Supervisor registered successfully",
        data: createdSupervisor,
        statusCode: 201,
      };
    } catch (error: any) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Registration failed: ${message}`);
    }
  }
}
