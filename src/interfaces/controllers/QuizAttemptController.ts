import sendResponse from "../../shared/utils/ResponseHelper";
import { Request, Response } from "express";
import { StartQuizUseCase } from "../../domain/usecases/QuizAttempt/StartQuizUseCase";
import { QuestionRepository } from "../../infrastructure/db/repositories/QuestionRepository";
import { SubmitAnswerUseCase } from "../../domain/usecases/QuizAttempt/SubmitAnswerUseCase";
import { UserAnswerRepository } from "../../infrastructure/db/repositories/UserAnswerRepository";
import { QuizAttemptRepository } from "../../infrastructure/db/repositories/QuizAttemptRepository";
import { GetQuizHistoryUseCase } from "../../domain/usecases/QuizAttempt/GetQuizHistoryUseCase";
import { CalculateScoreUseCase } from "../../domain/usecases/QuizAttempt/CalculateScoreUseCase";
import { GetAttemptHistoryUseCase } from "../../domain/usecases/QuizAttempt/GetAttemptHistoryUseCase";
import { GetQuizResultBySupervisorUseCase } from "../../domain/usecases/QuizAttempt/GetQuizResultBySupervisorUseCase";
import { GetQuizResultBySupervisorAndQuizIdUseCase } from "../../domain/usecases/QuizAttempt/GetQuizResultBySupervisorAndQuizId";
import { OptionRepository } from "../../infrastructure/db/repositories/OptionRepository";
import { BadgesRepository } from "../../infrastructure/db/repositories/BadgesRepository";
import { AwardBadgesUseCase } from "../../domain/usecases/Badges/AwardBadgesUseCase";
import { EmployeeRepository } from "../../infrastructure/db/repositories/EmployeeRepository";

const quizAttemptRepository = new QuizAttemptRepository();
const questionRepository = new QuestionRepository();
const userAnswerRepository = new UserAnswerRepository();
const optionRepository = new OptionRepository();
const badgesRepository = new BadgesRepository();
const employeeRepository = new EmployeeRepository();

export class QuizAttemptController {
  static async startQuiz(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      console.log("User ID from locals:", userId);

      const { quizId } = req.params;
      const startQuizUseCase = new StartQuizUseCase(quizAttemptRepository);
      const result = await startQuizUseCase.execute(userId, quizId);

      return sendResponse(res, 201, "Quiz started successfully", result);
    } catch (error) {
      return sendResponse(
        res,
        500,
        error instanceof Error ? error.message : "Internal Server Error"
      );
    }
  }

  static async submitAnswer(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const role = res.locals.role;
      const quizAttemptId = req.params.quizAttemptId;
      const { optionId, questionId } = req.body;

      const calculateScoreUseCase = new CalculateScoreUseCase(
        userAnswerRepository,
        quizAttemptRepository,
        questionRepository
      );

      const awardBadgesUseCase = new AwardBadgesUseCase(
        badgesRepository,
        quizAttemptRepository
      );

      await awardBadgesUseCase.awardBadgesToUser(userId);

      const submitAnswerUseCase = new SubmitAnswerUseCase(
        userAnswerRepository,
        calculateScoreUseCase,
        questionRepository,
        optionRepository,
        awardBadgesUseCase
      );

      const result = await submitAnswerUseCase.execute(
        userId,
        role,
        quizAttemptId,
        questionId,
        optionId
      );

      if (result.error) {
        const status = (result as any).statusCode || 400;
        return sendResponse(res, status, result.message, null);
      }

      return sendResponse(res, 201, result.message, result.data);
    } catch (error) {
      return sendResponse(
        res,
        500,
        error instanceof Error ? error.message : "Internal Server Error",
        null
      );
    }
  }

  static async getDetailQuizHistory(req: Request, res: Response) {
    try {
      const employeeId = req.params.id;

      const employee = await employeeRepository.getEmployee(employeeId);
      if (!employee || !employee.userId) {
        return sendResponse(
          res,
          404,
          "Employee or associated user not found",
          null
        );
      }

      const userId = employee.userId;

      const getDetailQuizHistory = new GetQuizHistoryUseCase(
        quizAttemptRepository
      );
      const result = await getDetailQuizHistory.execute(userId);

      return sendResponse(res, 200, "History retrieved successfully", result);
    } catch (error: any) {
      const message = error.message || "Unknown error";
      const status = error.statusCode || 400;
      return sendResponse(res, status, message);
    }
  }

  static async getAttemptHistory(req: Request, res: Response) {
    try {
      const employeeId = req.params.id;

      const useCase = new GetAttemptHistoryUseCase(
        quizAttemptRepository,
        employeeRepository
      );

      const result = await useCase.execute(employeeId);

      return sendResponse(res, 200, "Ergonomic history fetched", result);
    } catch (error) {
      console.error("Error fetching attempt history:", error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getAttemptHistoryProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;

      const getAttemptHistoryUseCase = new GetAttemptHistoryUseCase(
        quizAttemptRepository,
        employeeRepository
      );
      const result = await getAttemptHistoryUseCase.execute(userId);
      return sendResponse(res, 200, "Ergonomic history fetched", result);
    } catch (error) {
      console.error("Error fetching attempt history:", error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getAllAttemptBySupervisor(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.positionId;
      const { month } = req.query as { month?: string };

      const getQuizResultBySupervisorUseCase =
        new GetQuizResultBySupervisorUseCase(quizAttemptRepository);
      const result = await getQuizResultBySupervisorUseCase.execute(
        supervisorId,
        month
      );

      return sendResponse(
        res,
        200,
        "Success get employee quiz history",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        500,
        "Failed to get employee quiz by supervisor"
      );
    }
  }

  static async getAttemptResultByQuizId(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.positionId;
      const quizId = req.params.quizId;

      const getAttemptResultByQuizId =
        new GetQuizResultBySupervisorAndQuizIdUseCase(quizAttemptRepository);
      const result = await getAttemptResultByQuizId.execute(
        quizId,
        supervisorId
      );

      return sendResponse(
        res,
        200,
        "Success get quiz result by quizId",
        result
      );
    } catch (error) {
      return sendResponse(res, 500, "Failed to get quiz result by quizId");
    }
  }
}
