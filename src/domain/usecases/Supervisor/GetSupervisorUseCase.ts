import { ISupervisorRepository } from "../../repositories/ISupervisorRepository";
import { Supervisor } from "../../entities/Supervisor";

interface SupervisorProfileResponse {
  name: string;
  email: string;
  companyName: string;
}

export class GetSupervisorUseCase {
  constructor(private supervisorRepository: ISupervisorRepository) {}

  async execute(id: string): Promise<SupervisorProfileResponse> {
    const supervisor = await this.supervisorRepository.getSupervisor(id);

    if (!supervisor) {
      const error: any = new Error("Supervisor not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      name: supervisor.name!,
      email: supervisor.email!,
      companyName: supervisor.companyName!,
    };
  }
}
