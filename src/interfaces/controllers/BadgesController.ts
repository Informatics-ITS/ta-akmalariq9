import { Request, Response } from "express";
import { CreateBadgesUseCase } from "../../domain/usecases/Badges/CreateBadgesUseCase";
import { BadgesRepository } from "../../infrastructure/db/repositories/BadgesRepository";
import { ReadBadgesUseCase } from "../../domain/usecases/Badges/ReadBagesUseCase";
import { getAllBadgesUseCase } from "../../domain/usecases/Badges/GetAllBadgesUseCase";
import { UpdateBadgesUseCase } from "../../domain/usecases/Badges/UpdateBadgesUseCase";
import sendResponse from "../../shared/utils/ResponseHelper";
import { DeleteBadgesUseCase } from "../../domain/usecases/Badges/DeleteBadgesUseCase";

const badgesRepository = new BadgesRepository();

export class BadgesController {
  static async createBadges(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, quizCompleted } = req.body;

      const createBadgesUseCase = new CreateBadgesUseCase(badgesRepository);
      const result = await createBadgesUseCase.execute(
        name,
        quizCompleted,
        description
      );

      if (result.error) {
        return sendResponse(res, 400, result.message);
      }

      sendResponse(res, 201, "Badges created successfully", result.data);
    } catch (error) {
      console.error("[BadgesController] createBadges error", error);
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      sendResponse(res, 500, message);
    }
  }

  static async readBadges(req: Request, res: Response): Promise<void> {
    try {
      const badgeId = req.params.badgeId;

      const readBadgesUseCase = new ReadBadgesUseCase(badgesRepository);
      const result = await readBadgesUseCase.execute(badgeId);

      if (result.error) {
        return sendResponse(res, 404, result.message);
      }

      sendResponse(res, 200, "Badges retrieved successfully", result.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      sendResponse(res, 500, message);
    }
  }

  static async getAllBadges(req: Request, res: Response): Promise<void> {
    try {
      const getAllBadges = new getAllBadgesUseCase(badgesRepository);
      const result = await getAllBadges.execute();

      if (result.error) {
        const isSystemError = /internal|unexpected|database/i.test(
          result.message || ""
        );
        return sendResponse(res, isSystemError ? 500 : 404, result.message);
      }

      sendResponse(res, 200, "All badges retrieved successfully", result.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      sendResponse(res, 500, message);
    }
  }

  static async updateBadges(req: Request, res: Response) {
    try {
      const { badgeId } = req.params;
      const { name, description, quizCompleted } = req.body;

      const updateBadgesUseCase = new UpdateBadgesUseCase(badgesRepository);
      const result = await updateBadgesUseCase.execute(badgeId, {
        name,
        quizCompleted,
        description,
      });

      if (result.error) {
        return sendResponse(
          res,
          result.statusCode || 400,
          result.message,
          null
        );
      }

      return sendResponse(res, 200, "Badge updated successfully", result.data);
    } catch (error: any) {
      const message = error.message || "Unknown error";
      const status = error.statusCode || 400;
      return sendResponse(res, status, message);
    }
  }

  static async deleteBadges(req: Request, res: Response) {
    try {
      const badgeId = req.params.badgeId;

      const deleteBadgesUseCase = new DeleteBadgesUseCase(badgesRepository);
      const result = await deleteBadgesUseCase.execute(badgeId);

      sendResponse(res, 200, "Badge deleted successfully", result);
    } catch (error: any) {
      const message = error.message || "Unknown error";
      const status = error.statusCode || 400;
      return sendResponse(res, status, message);
    }
  }
}
