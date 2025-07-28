import { Quiz } from "../../../domain/entities/Quiz";
import { QuizModel } from "../models/QuizModels";
import { OptionModel } from "../models/OptionModels";
import { QuestionModel } from "../models/QuestionModels";
import { SupervisorModel } from "../models/SupervisorModels";
import { UserModel } from "../models/UserModels";
import { IQuizRepository } from "../../../domain/repositories/IQuizRepository";
import { INotificationRepository } from "../../../domain/repositories/INotificationRepository";
import { Notification } from "../../../domain/entities/Notification";
import { v4 as uuidv4 } from "uuid";

export class QuizRepository implements IQuizRepository {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async createQuiz(quiz: Quiz): Promise<Quiz> {
    const created = await QuizModel.create({
      title: quiz.title,
      authorType: quiz.authorType,
      authorId: quiz.authorId,
    });

    if (quiz.authorType === "supervisor") {
      const supervisor = await SupervisorModel.findOne({
        where: { userId: quiz.authorId },
      });

      if (!supervisor) {
        throw new Error("Supervisor not found for the given user");
      }

      const notification = new Notification(
        uuidv4(),
        "New Quiz",
        `Your supervisor has uploaded a new quiz (${created.title})`,
        supervisor.id
      );

      await this.notificationRepository.createNotification(notification);
    }

    return new Quiz(
      created.id,
      created.title,
      created.authorType,
      created.authorId
    );
  }

  async updateQuiz(id: string, quiz: Partial<Quiz>): Promise<Quiz> {
    await QuizModel.update(quiz, { where: { id } });

    const updated = await QuizModel.findByPk(id);
    if (!updated) throw new Error("Quiz not found");

    return new Quiz(
      updated.id,
      updated.title,
      updated.authorType,
      updated.authorId
    );
  }

  async deleteQuiz(id: string): Promise<void> {
    await QuizModel.destroy({ where: { id } });
  }

  async getQuestionsByQuizId(quizId: string) {
    return await QuestionModel.findAll({
      where: { quizId },
      attributes: ["id", "question", "quizId"],
      include: [
        {
          model: OptionModel,
          as: "options",
          attributes: ["id", "text", "isCorrect", "questionId"],
        },
      ],
    });
  }

  async getAllQuizBySupervisorId(supervisorId: string): Promise<any[]> {
    const quizzes = await QuizModel.findAll({
      where: { authorId: supervisorId },
      order: [["createdAt", "ASC"]],
    });

    const supervisor = await SupervisorModel.findByPk(supervisorId, {
      include: [{ model: UserModel, as: "user", attributes: ["name"] }],
    });

    const supervisorName = supervisor?.user?.name ?? "Unknown";

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      author: supervisorName,
      createdAt: quiz.createdAt,
    }));
  }

  async getAllQuizByAuthorId(authorUserId: string): Promise<any[]> {
    const quizzes = await QuizModel.findAll({
      where: { authorId: authorUserId },
      order: [["createdAt", "ASC"]],
    });

    const user = await UserModel.findByPk(authorUserId, {
      attributes: ["name"],
    });

    const authorName = user?.name ?? "Unknown";

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      author: authorName,
      createdAt: quiz.createdAt,
    }));
  }

  async getAllQuizBySuperadmin(): Promise<any[]> {
    const superadminquiz = await QuizModel.findAll({
      where: { authorType: "superadmin" },
      order: [["createdAt", "ASC"]],
    });

    return superadminquiz.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      createdAt: quiz.createdAt,
    }));
  }
}
