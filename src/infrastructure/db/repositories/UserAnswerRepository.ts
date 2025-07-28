import { IUserAnswerRepository } from "../../../domain/repositories/IUserAnswerRepository";
import { UserAnswer } from "../../../domain/entities/UserAnswer";
import { UserAnswerModel } from "../models/UserAnswerModels";
import { OptionModel } from "../models/OptionModels";
import { QuestionModel } from "../models/QuestionModels";
import { EmployeeModel } from "../models/EmployeeModels";
import { UserModel } from "../models/UserModels";

export class UserAnswerRepository implements IUserAnswerRepository {
  async submitAnswer(
    userId: string,
    attemptId: string,
    selectedOptionId: string
  ): Promise<UserAnswer> {
    const existingAnswer = await UserAnswerModel.findOne({
      where: {
        attemptId,
        selectedOptionId,
        userId,
      },
    });

    if (existingAnswer) {
      throw new Error("You have already answered this question.");
    }

    const answer = await UserAnswerModel.create({
      userId,
      attemptId,
      selectedOptionId,
    });

    return new UserAnswer(
      answer.id,
      answer.userId,
      answer.attemptId,
      answer.selectedOptionId
    );
  }

  async getAnswersByAttemptId(attemptId: string): Promise<any[]> {
    const answers = await UserAnswerModel.findAll({
      where: { attemptId },
      attributes: ["id", "selectedOptionId", "userId"],
    });

    if (!answers || answers.length === 0) {
      return [];
    }

    const optionIds = answers.map((a) => a.selectedOptionId);
    const userIds = answers.map((a) => a.userId);

    const options = await OptionModel.findAll({
      where: { id: optionIds },
      attributes: ["id", "text", "isCorrect", "questionId"],
    });

    const questionIds = options.map((o) => o.questionId);

    const questions = await QuestionModel.findAll({
      where: { id: questionIds },
      attributes: ["id", "question"],
    });

    const employees = await EmployeeModel.findAll({
      where: { userId: userIds },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    const optionMap = new Map(options.map((o) => [o.id, o]));
    const questionMap = new Map(questions.map((q) => [q.id, q.question]));
    const userMap = new Map(
      employees.map((e) => [e.userId, e.user?.name ?? "Unknown"])
    );

    return answers.map((a) => {
      const option = optionMap.get(a.selectedOptionId);
      const questionText = option ? questionMap.get(option.questionId) : null;
      return {
        id: a.id,
        employeeName: userMap.get(a.userId) ?? null,
        questionText: questionText ?? null,
        answerText: option?.text ?? null,
        isCorrect: option?.isCorrect ?? null,
      };
    });
  }

  async getAnswersByUserId(userId: string): Promise<UserAnswer[]> {
    const answers = await UserAnswerModel.findAll({ where: { userId } });
    return answers.map(
      (a) => new UserAnswer(a.id, a.userId, a.attemptId, a.selectedOptionId)
    );
  }

  async getAnswersByAttempt(attemptId: string): Promise<UserAnswer[]> {
    const answers = await UserAnswerModel.findAll({
      where: { attemptId },
      include: [
        {
          model: OptionModel,
          as: "option",
          attributes: ["isCorrect"],
        },
      ],
    });

    return answers.map((a) => {
      const isCorrect = a.option?.isCorrect ?? false;
      return new UserAnswer(
        a.id,
        a.attemptId,
        a.userId,
        a.selectedOptionId,
        isCorrect
      );
    });
  }
}
