import { IQuizRepository } from "../../repositories/IQuizRepository";

export class GetAllQuizBySuperadminUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute() {
    const quiz = await this.quizRepository.getAllQuizBySuperadmin();

    if (!quiz || quiz.length === 0) {
      const error: any = new Error(
        "Quiz not found for the given supervisor ID"
      );
      error.statusCode = 404;
      throw error;
    }
    return quiz;
  }
}
