import { Badges } from "../../../domain/entities/Badges";
import { BadgesModel } from "../models/BadgesModels";
import { IBadgesRepository } from "../../../domain/repositories/IBadgesRepository";
import { Op } from "sequelize";
import { QuizAttemptRepository } from "./QuizAttemptRepository";
import { UserBadgesModel } from "../models/UserBadgesModels";

export class BadgesRepository implements IBadgesRepository {
  private quizAttemptRepository: QuizAttemptRepository;

  constructor() {
    this.quizAttemptRepository = new QuizAttemptRepository();
  }

  async createBadges(badges: Badges): Promise<Badges> {
    const newBadge = await BadgesModel.create({
      name: badges.name,
      quizCompleted: badges.quizCompleted,
      description: badges.description,
    });

    return new Badges(
      newBadge.id,
      newBadge.name,
      newBadge.quizCompleted,
      newBadge.description
    );
  }

  async readBadges(id: string): Promise<Badges | null> {
    try {
      const badge = await BadgesModel.findOne({ where: { id } });
      if (!badge) return null;

      return new Badges(
        badge.id,
        badge.name,
        badge.quizCompleted,
        badge.description
      );
    } catch (error) {
      console.error("Error fetching badge by ID:", error);
      throw new Error("Error fetching badge by ID");
    }
  }

  async updateBadges(
    id: string,
    badges: Partial<Badges>
  ): Promise<Badges | null> {
    try {
      const [affectedRows] = await BadgesModel.update(
        {
          name: badges.name,
          description: badges.description,
          quizCompleted: badges.quizCompleted,
        },
        { where: { id } }
      );

      if (affectedRows === 0) {
        throw new Error("Badge not found");
      }

      const updatedBadge = await BadgesModel.findOne({ where: { id } });

      if (!updatedBadge) {
        throw new Error("Badge not found after update");
      }

      return new Badges(
        updatedBadge.id,
        updatedBadge.name,
        updatedBadge.quizCompleted,
        updatedBadge.description
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new Error(message);
    }
  }

  async getAllBadges(): Promise<Badges[]> {
    try {
      const badgesList = await BadgesModel.findAll();
      return badgesList.map(
        (badge) =>
          new Badges(
            badge.id,
            badge.name,
            badge.quizCompleted,
            badge.description
          )
      );
    } catch (error) {
      throw new Error("Error fetching all badges");
    }
  }

  async deleteBadges(id: string): Promise<void> {
    try {
      await BadgesModel.destroy({ where: { id } });
    } catch (error) {
      throw new Error("Error deleting badge");
    }
  }

  async getAwardableBadges(attemptCount: number): Promise<Badges[]> {
    const badges = await BadgesModel.findAll({
      where: {
        quizCompleted: {
          [Op.lte]: attemptCount,
        },
      },
    });

    return badges.map(
      (badge) =>
        new Badges(badge.id, badge.name, badge.quizCompleted, badge.description)
    );
  }

  async awardBadgesToUser(userId: string): Promise<void> {
    try {
      const completedQuizCount =
        await this.quizAttemptRepository.countCompletedQuizzes(userId);

      const eligibleBadges = await this.getAwardableBadges(completedQuizCount);

      for (const badge of eligibleBadges) {
        const alreadyAwarded = await UserBadgesModel.findOne({
          where: { userId, badgeId: badge.id },
        });

        if (!alreadyAwarded) {
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
