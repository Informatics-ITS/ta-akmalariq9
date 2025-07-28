import { QuizAttemptRepository } from "../../../infrastructure/db/repositories/QuizAttemptRepository";
import { UserBadgesModel } from "../../../infrastructure/db/models/UserBadgesModels";
import { BadgesRepository } from "../../../infrastructure/db/repositories/BadgesRepository";

export class AwardBadgesUseCase {
  constructor(
    private badgesRepository: BadgesRepository,
    private quizAttemptRepository: QuizAttemptRepository
  ) {}

  async awardBadgesToUser(userId: string): Promise<void> {
    try {
      const completedQuizCount =
        await this.quizAttemptRepository.countCompletedQuizzes(userId);

      const eligibleBadges = await this.badgesRepository.getAwardableBadges(
        completedQuizCount
      );

      for (const badge of eligibleBadges) {
        const existingBadge = await UserBadgesModel.findOne({
          where: { userId, badgeId: badge.id },
        });

        if (!existingBadge) {
          await UserBadgesModel.create({
            userId,
            badgeId: badge.id,
          });
        }
      }
    } catch (error) {
      console.error("Error awarding badges to user:", error);
      throw new Error("Error awarding badges");
    }
  }
}
