import { IErgonomicVideoRepository } from "../../repositories/IErgonomicVideoRepository";

export class GetErgonomicVideoHistoryUseCase {
  constructor(private repo: IErgonomicVideoRepository) {}

  async execute(userId: string) {
    return this.repo.getErgonomicVideoHistory(userId);
  }
}
