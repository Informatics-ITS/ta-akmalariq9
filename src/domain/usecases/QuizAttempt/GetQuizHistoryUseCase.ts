import { IQuizAttemptRepository } from "../../repositories/IQuizAttemptRepository";

export class GetQuizHistoryUseCase {
  constructor(private quizAttemptRepo: IQuizAttemptRepository) {}

  async execute(userId: string) {
    const attempts = await this.quizAttemptRepo.getDetailedAttemptsByUser(
      userId
    );

    if (!attempts || attempts.length === 0) {
      const error: any = new Error("Quiz history not found");
      error.statusCode = 404;
      throw error;
    }

    return attempts.map((attempt) => ({
      quiz_title: attempt.quiz?.title,
      answers: attempt.answers?.map((answer) => ({
        text: answer.option?.text,
        isCorrect: answer.option?.isCorrect,
      })),
      createdAt: attempt.createdAt,
    }));
  }
}
