import { IErgonomicVideoMoveNetRepository } from "../../repositories/IErgonomicVideoMoveNetRepository";

export class UploadErgonomicVideMoveNetUseCase {
  constructor(private repo: IErgonomicVideoMoveNetRepository) {}

  async execute(userId: string, filePath: string) {
    return this.repo.uploadErgonomicVideoMoveNet(userId, filePath);
  }
}
