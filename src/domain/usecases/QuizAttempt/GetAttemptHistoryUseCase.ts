import { IQuizAttemptRepository } from "../../../domain/repositories/IQuizAttemptRepository";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";

export class GetAttemptHistoryUseCase {
  constructor(
    private quizRepo: IQuizAttemptRepository,
    private employeeRepo: IEmployeeRepository
  ) {}

  async execute(userId: string) {
    const employee = await this.employeeRepo.getByUserId(userId);

    if (!employee) {
      const error: any = new Error("Employee or associated user not found");
      error.statusCode = 404;
      throw error;
    }

    return this.quizRepo.getHistoryByUser(userId);
  }
}
