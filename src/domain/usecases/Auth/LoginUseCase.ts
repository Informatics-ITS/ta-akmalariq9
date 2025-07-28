import { IUserRepository } from "../../repositories/IUserRepository";
import { ISupervisorRepository } from "../../repositories/ISupervisorRepository";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IResponse } from "../../../shared/utils/IResponse";
import { UserModel } from "../../../infrastructure/db/models/UserModels";
import { SupervisorModel } from "../../../infrastructure/db/models/SupervisorModels";
import { createToken } from "../../../shared/utils/JwtUtils";
import { comparePassword } from "../../../shared/utils/PasswordUtils";

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private supervisorRepository: ISupervisorRepository,
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(email: string, password: string): Promise<IResponse<any>> {
    try {
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return {
          error: true,
          message: "Email not found",
          data: null,
        };
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return {
          error: true,
          message: "Invalid email or password",
          data: null,
        };
      }

      const basePayload: {
        userId: string;
        role: string;
        positionId: string;
        companyId: string | null;
        supervisorId: string | null;
      } = {
        userId: user.id,
        role: user.role,
        positionId: "",
        companyId: null,
        supervisorId: null,
      };

      if (user.role === "supervisor") {
        const supervisor = await SupervisorModel.findOne({
          where: { userId: user.id },
        });

        if (!supervisor) {
          return {
            error: true,
            message: "Supervisor profile not found",
            data: null,
          };
        }

        basePayload.positionId = supervisor.id;
        basePayload.companyId = supervisor.companyId;
      } else if (user.role === "employee") {
        const employee = await this.employeeRepository.getByUserId(user.id);
        console.log("Employee profile:", employee);
        if (!employee) {
          return {
            error: true,
            message: "Employee profile not found",
            data: null,
          };
        }

        basePayload.positionId = employee.id;
        basePayload.supervisorId = employee.supervisorId;
      }

      const token = createToken(basePayload);
      console.log("Generated token:", token);

      return {
        error: false,
        message: "Login successful",
        data: {
          token,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message || "An error occurred during login"
          : "An unknown error occurred";

      return {
        error: true,
        message: errorMessage,
        data: null,
      };
    }
  }
}
