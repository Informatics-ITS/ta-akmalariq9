import { Request, Response, NextFunction } from "express";
import { QuestionModel } from "../db/models/QuestionModels";
import { QuizModel } from "../db/models/QuizModels";
import { EmployeeModel } from "../db/models/EmployeeModels";
import { SupervisorModel } from "../db/models/SupervisorModels";
import sendResponse from "../../shared/utils/ResponseHelper";

export async function VerifyQuestionAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { quizId, questionId } = req.params;
    const role = res.locals.role;
    const userId = res.locals.userId;
    const positionId = res.locals.positionId;

    console.log("VerifyQuestionAccess middleware called");
    console.log("Request params:", req.params);
    console.log("User role:", role);
    console.log("User ID:", userId);
    console.log("Position ID:", positionId);
    const whereCondition = quizId ? { quizId } : { id: questionId };

    const question = await QuestionModel.findOne({
      where: whereCondition,
      include: [
        {
          model: QuizModel,
          as: "quiz",
          attributes: ["id", "authorId", "authorType"],
          required: true,
        },
      ],
    });

    if (!question) {
      return sendResponse(res, 404, "Question or quiz not found", null);
    }

    const quiz = (question as any).quiz;
    const { authorId, authorType } = quiz;

    // ✅ Supervisor accessing their own quiz
    if (role === "supervisor") {
      if (userId !== authorId) {
        return sendResponse(
          res,
          403,
          "Access denied. You don't own this quiz.",
          null
        );
      }
      return next();
    }

    if (authorType === "superadmin") {
      if (role === "personal") {
        if (["PUT", "DELETE"].includes(req.method)) {
          return sendResponse(
            res,
            403,
            "Access denied. You cannot modify or delete superadmin questions.",
            null
          );
        }
        return next();
      }

      return sendResponse(
        res,
        403,
        "Access denied. Only personal users can access superadmin quizzes.",
        null
      );
    }

    if (authorType === "supervisor" && role === "employee") {
      const employee = await EmployeeModel.findOne({
        where: { id: positionId },
        attributes: ["supervisorId"],
      });

      if (!employee) {
        return sendResponse(
          res,
          403,
          "Access denied. Employee not found.",
          null
        );
      }

      const supervisor = await SupervisorModel.findOne({
        where: { id: employee.supervisorId },
        attributes: ["userId"],
      });

      if (!supervisor || supervisor.userId !== authorId) {
        return sendResponse(
          res,
          403,
          "Access denied. This quiz doesn't belong to your supervisor.",
          null
        );
      }

      if (["PUT", "DELETE"].includes(req.method)) {
        return sendResponse(
          res,
          403,
          "Access denied. You cannot modify or delete questions.",
          null
        );
      }

      return next();
    }

    return sendResponse(
      res,
      403,
      "Access denied. Invalid quiz ownership or user role.",
      null
    );
  } catch (error) {
    console.error("Error in VerifyQuestionAccess middleware:", error);
    return sendResponse(res, 500, "Internal server error", null);
  }
}
