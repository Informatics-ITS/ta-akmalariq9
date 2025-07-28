import { Quiz } from "../../entities/Quiz";
import { IResponse } from "../../../shared/utils/IResponse";
import { IQuizRepository } from "../../repositories/IQuizRepository";
import {
  errorResponse,
  successResponse,
} from "../../../shared/utils/CreateResponse";

export class CreateQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(
    title: string,
    authorType: "supervisor" | "superadmin",
    authorId: string
  ): Promise<IResponse<Quiz>> {
    const trimmedTitle = title.trim();
    const trimmedAuthorId = authorId.trim();

    if (!trimmedTitle || !trimmedAuthorId) {
      return errorResponse("Title, and Supervisor ID are required", 400);
    }

    const quiz = new Quiz("", trimmedTitle, authorType, trimmedAuthorId);

    try {
      const quizCreated = await this.quizRepository.createQuiz(quiz);
      return successResponse("Quiz created successfully", quizCreated, 201);
    } catch (error) {
      console.error("Error creating quiz:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Quiz creation failed: ${message}`);
    }
  }
}
