import { IBadgesRepository } from "../../repositories/IBadgesRepository";
import { Badges } from "../../entities/Badges";
import { IResponse } from "../../../shared/utils/IResponse";
import {
  successResponse,
  errorResponse,
} from "../../../shared/utils/CreateResponse";

export class CreateBadgesUseCase {
  constructor(private badgesRepository: IBadgesRepository) {}

  async execute(
    name: string,
    quizCompleted: number,
    description: string
  ): Promise<IResponse<Badges>> {
    if (!name) {
      return errorResponse("Name are required", 400);
    }

    try {
      const badges = new Badges("", name, quizCompleted, description);
      const newBadges = await this.badgesRepository.createBadges(badges);

      return successResponse("Badges created successfully", newBadges, 201);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Creation failed: ${message}`);
    }
  }
}
