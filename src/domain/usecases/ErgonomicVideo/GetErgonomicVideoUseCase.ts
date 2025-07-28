import { IErgonomicVideoRepository } from "../../repositories/IErgonomicVideoRepository";

export class GetErgonomicVideoUseCase {
  constructor(private repo: IErgonomicVideoRepository) {}

  async execute(userId: string, jobId: string) {
    return this.repo.getErgonomicVideoResult(userId, jobId);
  }
}
