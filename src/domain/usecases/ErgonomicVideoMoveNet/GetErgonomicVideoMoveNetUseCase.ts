import { IErgonomicVideoMoveNetRepository } from "../../repositories/IErgonomicVideoMoveNetRepository";

export class GetErgonomicVideoMoveNetUseCase {
  constructor(private repo: IErgonomicVideoMoveNetRepository) {}

  async execute(userId: string, jobId: string) {
    return this.repo.getErgonomicVideoMoveNetResult(userId, jobId);
  }
}
