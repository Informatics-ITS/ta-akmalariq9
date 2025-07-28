import { IBadgesRepository } from "../../repositories/IBadgesRepository";
import { IResponse } from "../../../shared/utils/IResponse";
import {
  successResponse,
  errorResponse,
} from "../../../shared/utils/CreateResponse";

export class getAllBadgesUseCase {
  constructor(private badgeRepository: IBadgesRepository) {}

  async execute(): Promise<IResponse<{ id: string; name: string }[]>> {
    try {
      const badges = await this.badgeRepository.getAllBadges();

      if (!badges.length) {
        return errorResponse("No badges found", 404);
      }

      const result = badges.map((badge) => ({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        quizCompleted: badge.quizCompleted,
      }));

      return successResponse("Companies retrieved successfully", result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve companies";
      return errorResponse(message, 500);
    }
  }
}
