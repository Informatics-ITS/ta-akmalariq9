import { IBadgesRepository } from "../../repositories/IBadgesRepository";
import { IResponse } from "../../../shared/utils/IResponse";
import {
  successResponse,
  errorResponse,
} from "../../../shared/utils/CreateResponse";

export class ReadBadgesUseCase {
  constructor(private badgeRepository: IBadgesRepository) {}

  async execute(badgeId: string): Promise<IResponse<any>> {
    try {
      if (!badgeId) return errorResponse("Badge ID is required", 400);

      const badges = await this.badgeRepository.readBadges(badgeId);

      if (!badges || (Array.isArray(badges) && badges.length === 0)) {
        return errorResponse("No badges found for this ID", 404);
      }

      return successResponse("Badges retrieved successfully", badges);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to get badges";
      return errorResponse(message, 500);
    }
  }
}
