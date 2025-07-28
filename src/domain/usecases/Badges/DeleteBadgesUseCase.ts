import { IBadgesRepository } from "../../repositories/IBadgesRepository";

export class DeleteBadgesUseCase {
  constructor(private badgeRepository: IBadgesRepository) {}

  async execute(id: string): Promise<void> {
    const badge = await this.badgeRepository.readBadges(id);

    if (!badge) {
      const error: any = new Error("Badge not found");
      error.statusCode = 404;
      throw error;
    }

    await this.badgeRepository.deleteBadges(id);
  }
}
