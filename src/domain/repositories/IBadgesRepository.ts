import { Badges } from "../entities/Badges";

export interface IBadgesRepository {
  createBadges(Badges: Badges): Promise<Badges>;
  updateBadges(id: string, Badges: Partial<Badges>): Promise<Badges | null>;
  readBadges(id: string): Promise<Badges | null>;
  getAllBadges(): Promise<Badges[]>;
  deleteBadges(id: string): Promise<void>;
}
