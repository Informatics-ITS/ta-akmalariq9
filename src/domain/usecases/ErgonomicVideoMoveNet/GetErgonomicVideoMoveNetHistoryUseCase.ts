import { IErgonomicVideoMoveNetRepository } from "../../repositories/IErgonomicVideoMoveNetRepository";

export class GetErgonomicVideoMoveNetHistoryUseCase {
  constructor(private repo: IErgonomicVideoMoveNetRepository) {}

  async execute(userId: string) {
    return this.repo.getErgonomicMoveNetVideoHistory(userId);
  }
}
