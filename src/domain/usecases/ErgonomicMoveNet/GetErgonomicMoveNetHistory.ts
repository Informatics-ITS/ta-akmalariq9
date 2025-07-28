import { IErgonomicsMoveNetRepository } from "../../repositories/IErgonomicMoveNetRepository";

export class GetErgonomicMoveNetHistoryUseCase {
  constructor(private repo: IErgonomicsMoveNetRepository) {}

  async execute(userId: string) {
    return this.repo.getErgonomicMoveNetHistory(userId);
  }
}
