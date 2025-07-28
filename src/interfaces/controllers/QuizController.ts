import { QuizRepository } from "../../infrastructure/db/repositories/QuizRepository";
import { Request, Response } from "express";
import { CreateQuizUseCase } from "../../domain/usecases/Quiz/CreateQuizUseCase";
import { UpdateQuizUseCase } from "../../domain/usecases/Quiz/UpdateQuizUseCase";
import { GetAllQuizBySupervisorId } from "../../domain/usecases/Quiz/GetAllQuizBySupervisorId";
import { GetAllQuizBySuperadminUseCase } from "../../domain/usecases/Quiz/GetAllQuizBySuperadminUseCase";
import { NotificationRepository } from "../../infrastructure/db/repositories/NotificationRepository";
import { SupervisorRepository } from "../../infrastructure/db/repositories/SupervisorRepository";
import sendResponse from "../../shared/utils/ResponseHelper";

const notificationRepository = new NotificationRepository();
const quizRepository = new QuizRepository(notificationRepository);
const supervisorRepository = new SupervisorRepository();

export class QuizController {
  static async createQuiz(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const authorType = res.locals.role;
      const authorId = res.locals.userId;
      const useCase = new CreateQuizUseCase(quizRepository);
      const result = await useCase.execute(title, authorType, authorId);

      return sendResponse(
        res,
        result.error ? 400 : 200,
        result.message,
        result.data
      );
    } catch (error) {
      return sendResponse(
        res,
        500,
        error instanceof Error ? error.message : "Internal Server Error"
      );
    }
  }

  static async updateQuiz(req: Request, res: Response) {
    try {
      const { quizId } = req.params;
      const { title } = req.body;

      const updateQuizUseCase = new UpdateQuizUseCase(quizRepository);
      const result = await updateQuizUseCase.execute(quizId, title);

      return sendResponse(res, 200, "Quiz updated successfully.", result);
    } catch (error) {
      return sendResponse(
        res,
        500,
        error instanceof Error ? error.message : "Internal Server Error"
      );
    }
  }

  static async getAllQuizBySupervisorId(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.supervisorId;

      if (!supervisorId) {
        return sendResponse(res, 400, "Supervisor ID not found in token");
      }

      const getAllQuizBySpvId = new GetAllQuizBySupervisorId(
        quizRepository,
        supervisorRepository 
      );
      const result = await getAllQuizBySpvId.execute(supervisorId);

      return sendResponse(res, 200, "Quiz list fetched successfully.", result);
    } catch (error: any) {
      const message = error.message || "Unknown error";
      const status = error.statusCode || 400;
      return sendResponse(res, status, message);
    }
  }

  static async getAllQuizBySuperadmin(req: Request, res: Response) {
    try {
      const role = res.locals.role;
      const userId = res.locals.userId;

      const getAllQuizBySuperadmin = new GetAllQuizBySuperadminUseCase(
        quizRepository
      );
      const result = await getAllQuizBySuperadmin.execute();

      return sendResponse(res, 200, "Quiz list fetched successfully.", result);
    } catch (error: any) {
      const message = error.message || "Unknown error";
      const status = error.statusCode || 400;
      return sendResponse(res, status, message);
    }
  }
}
