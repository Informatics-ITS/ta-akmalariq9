import { IDivisionRepository } from "../../repositories/IDivisionRepository";

export class DeleteDivisionUseCase {
  constructor(private divisionRepository: IDivisionRepository) {}

  async execute(id: string): Promise<void> {
    const division = await this.divisionRepository.getDivision(id);

    if (!division) {
      const error: any = new Error("Division not found");
      error.statusCode = 404;
      throw error;
    }

    await this.divisionRepository.deleteDivision(id);
  }
}
