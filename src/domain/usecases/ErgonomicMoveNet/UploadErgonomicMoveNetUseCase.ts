import { IErgonomicsMoveNetRepository } from "../../repositories/IErgonomicMoveNetRepository";

export class UploadErgonomicMoveNetUseCase {
  constructor(private repo: IErgonomicsMoveNetRepository) {}

  async execute(userId: string, filePath: string) {
    return this.repo.uploadErgonomicsMoveNet(userId, filePath);
  }
}
