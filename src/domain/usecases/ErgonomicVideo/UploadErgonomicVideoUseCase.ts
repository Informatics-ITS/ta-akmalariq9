import { IErgonomicVideoRepository } from "../../repositories/IErgonomicVideoRepository";

export class UploadErgonomicVideoUseCase {
  constructor(private repo: IErgonomicVideoRepository) {}

  async execute(userId: string, filePath: string) {
    return this.repo.uploadErgonomicsVideo(userId, filePath);
  }
}
