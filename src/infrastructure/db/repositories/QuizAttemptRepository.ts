import { IQuizAttemptRepository } from "../../../domain/repositories/IQuizAttemptRepository";
import { QuizAttempt } from "../../../domain/entities/QuizAttempt";
import { QuizAttemptModel } from "../models/QuizAttemptModels";
import { QuizModel } from "../models/QuizModels";
import { UserAnswerModel } from "../models/UserAnswerModels";
import { OptionModel } from "../models/OptionModels";
import { EmployeeModel } from "../models/EmployeeModels";
import { SupervisorModel } from "../models/SupervisorModels";
import { Op } from "sequelize";
import { UserModel } from "../models/UserModels";

export class QuizAttemptRepository implements IQuizAttemptRepository {
  async startAttempt(userId: string, quizId: string): Promise<QuizAttempt> {
    const attempt = await QuizAttemptModel.create({ userId, quizId });
    return new QuizAttempt(attempt.id, attempt.quizId, attempt.userId);
  }

  async getAttemptsByUser(userId: string): Promise<QuizAttempt[]> {
    const attempts = await QuizAttemptModel.findAll({ where: { userId } });
    return attempts.map((a) => new QuizAttempt(a.id, a.quizId, a.userId));
  }

  async getHistoryByUser(userId: string): Promise<any[]> {
    const records = await QuizAttemptModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: QuizModel,
          as: "quiz",
          attributes: ["id", "title", "authorId"],
        },
      ],
    });

    const authorUserIds = records
      .map((r) => r.quiz?.authorId)
      .filter((id): id is string => typeof id === "string");

    const supervisors = await SupervisorModel.findAll({
      where: { userId: { [Op.in]: authorUserIds } },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    const supervisorMap = new Map(
      supervisors.map((s) => [s.userId, s.user?.name || "Unknown"])
    );

    return records.map((r) => ({
      id: r.id,
      quizId: r.quizId,
      userId: r.userId,
      score: r.score,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      quizName: r.quiz?.title || "",
      quizAuthor: supervisorMap.get(r.quiz?.authorId ?? "") || "",
    }));
  }

  async getAttemptById(id: string): Promise<QuizAttempt | null> {
    const attempt = await QuizAttemptModel.findByPk(id);
    return attempt
      ? new QuizAttempt(attempt.id, attempt.quizId, attempt.userId)
      : null;
  }

  async getDetailedAttemptsByUser(userId: string): Promise<any[]> {
    const attempts = await QuizAttemptModel.findAll({
      where: { userId },
      include: [
        {
          model: QuizModel,
          as: "quiz",
          attributes: ["id", "title"],
        },
        {
          model: UserAnswerModel,
          as: "answers",
          include: [
            {
              model: OptionModel,
              as: "option",
              attributes: ["id", "text", "isCorrect"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return attempts;
  }

  async updateScore(attemptId: string, score: number): Promise<void> {
    await QuizAttemptModel.update({ score }, { where: { id: attemptId } });
  }

  async getAllAttempts(): Promise<QuizAttempt[]> {
    const attempts = await QuizAttemptModel.findAll();
    return attempts.map((a) => new QuizAttempt(a.id, a.quizId, a.userId));
  }

  async getAllBySupervisorId(supervisorId: string): Promise<any[]> {
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    const employeeMap = new Map<string, string>();
    employees.forEach((e) => {
      employeeMap.set(e.userId, e.user?.name || "Unknown");
    });

    const employeeUserIds = employees.map((e) => e.userId);

    const records = await QuizAttemptModel.findAll({
      where: { userId: employeeUserIds },
      include: [
        {
          model: QuizModel,
          as: "quiz",
          attributes: ["title"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      quizId: r.quizId,
      name: employeeMap.get(r.userId) || "",
      score: r.score,
      quizName: r.quiz?.title || "",
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  async getByQuizIdAndSupervisorId(
    quizId: string,
    supervisorId: string
  ): Promise<any[]> {
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    const employeeMap = new Map<string, string>();
    employees.forEach((e) => {
      const name = e.user?.name ?? "Unknown";
      employeeMap.set(e.userId, name);
    });

    const employeeUserIds = employees.map((e) => e.userId);

    const records = await QuizAttemptModel.findAll({
      where: {
        quizId,
        userId: employeeUserIds,
      },
      include: [
        {
          model: QuizModel,
          as: "quiz",
          attributes: ["title"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      quizId: r.quizId,
      userId: r.userId,
      name: employeeMap.get(r.userId) || "",
      score: r.score,
      quizName: r.quiz?.title || "",
    }));
  }

  async countCompletedQuizzes(userId: string): Promise<number> {
    const count = await QuizAttemptModel.count({
      where: {
        userId,
        score: { [Op.ne]: null },
      },
    });
    return count;
  }
}
