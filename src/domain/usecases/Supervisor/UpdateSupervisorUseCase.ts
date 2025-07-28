import bcrypt from "bcrypt";
import { Supervisor } from "../../entities/Supervisor";
import { ISupervisorRepository } from "../../repositories/ISupervisorRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateSupervisorUseCase {
  constructor(
    private supervisorRepository: ISupervisorRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    id: string,
    updateData: {
      name?: string;
      email?: string;
      password?: string;
      companyId?: string;
    }
  ): Promise<Supervisor> {
    const existingSupervisor = await this.supervisorRepository.getSupervisor(
      id
    );
    if (!existingSupervisor) {
      const error: any = new Error("Supervisor not found");
      error.statusCode = 404;
      throw error;
    }

    const user = await this.userRepository.getPersonal(
      existingSupervisor.userId
    );
    if (!user) {
      const error: any = new Error("Associated user not found");
      error.statusCode = 404;
      throw error;
    }

    if (updateData.email && updateData.email !== user.email) {
      const emailTaken = await this.userRepository.isEmailExists(
        updateData.email
      );
      if (emailTaken) {
        const error: any = new Error("Email already in use");
        error.statusCode = 400;
        throw error;
      }
    }

    const hashedPassword = updateData.password
      ? await bcrypt.hash(updateData.password, 10)
      : user.password;

    await this.userRepository.updatePersonal(user.id, {
      name: updateData.name ?? user.name,
      email: updateData.email ?? user.email,
      password: hashedPassword,
    });

    const updatedSupervisor = await this.supervisorRepository.updateSupervisor(
      id,
      {
        ...existingSupervisor,
        companyId: updateData.companyId ?? existingSupervisor.companyId,
      }
    );

    return updatedSupervisor;
  }
}
