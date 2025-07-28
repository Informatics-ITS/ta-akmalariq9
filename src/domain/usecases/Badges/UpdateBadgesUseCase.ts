import { Badges } from "../../entities/Badges";
import { IBadgesRepository } from "../../repositories/IBadgesRepository";
import { IResponse } from "../../../shared/utils/IResponse";
import {
  errorResponse,
  successResponse,
} from "../../../shared/utils/CreateResponse";

export class UpdateBadgesUseCase {
  constructor(private badgeRepository: IBadgesRepository) {}

  async execute(
    id: string,
    updateData: Partial<Badges>
  ): Promise<IResponse<Badges>> {
    try {
      const existingBadges = await this.badgeRepository.readBadges(id);

      if (
        updateData.name !== undefined &&
        typeof updateData.name === "string" &&
        updateData.name.trim() === ""
      ) {
        return errorResponse("Name cannot be empty", 400);
      }

      if (!existingBadges) {
        return errorResponse("Badges not found", 404);
      }

      const updatedData: Partial<Badges> = {
        name: updateData.name ?? existingBadges.name,
        quizCompleted: updateData.quizCompleted ?? existingBadges.quizCompleted,
        description: updateData.description ?? existingBadges.description,
      };

      const updatedBadges = await this.badgeRepository.updateBadges(
        id,
        updatedData
      );

      if (!updatedBadges) {
        return errorResponse("Failed to update badges", 500);
      }
      return successResponse("Badges updated successfully", updatedBadges);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update badges";
      return errorResponse(message, 500);
    }
  }
}
