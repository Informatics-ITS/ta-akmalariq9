import { ISupervisorRepository } from "../../repositories/ISupervisorRepository";

export class DeleteSupervisorUseCase {
  constructor(private supervisorRepository: ISupervisorRepository) {}

  async execute(id: string): Promise<void> {
    const supervisor = await this.supervisorRepository.getSupervisor(id);

    if (!supervisor) {
      const error: any = new Error("Supervisor not found");
      error.statusCode = 404;
      throw error;
    }

    await this.supervisorRepository.deleteSupervisor(id);
  }
}
