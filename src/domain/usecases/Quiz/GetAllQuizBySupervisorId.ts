import { IQuizRepository } from "../../repositories/IQuizRepository";
import { ISupervisorRepository } from "../../repositories/ISupervisorRepository";

export class GetAllQuizBySupervisorId {
  constructor(
    private readonly quizRepository: IQuizRepository,
    private readonly supervisorRepository: ISupervisorRepository
  ) {}

  async execute(supervisorId: string) {
    if (!supervisorId) {
      throw new Error("Supervisor ID is required.");
    }
    const supervisor = await this.supervisorRepository.getSupervisor(
      supervisorId
    );
    if (!supervisor) {
      const error: any = new Error("Supervisor not found");
      error.statusCode = 404;
      throw error;
    }

    const userId = supervisor.userId;

    const quizzes = await this.quizRepository.getAllQuizByAuthorId(userId);
    if (!quizzes || quizzes.length === 0) {
      const error: any = new Error("No quizzes found for this supervisor");
      error.statusCode = 404;
      throw error;
    }

    return quizzes;
  }
}
