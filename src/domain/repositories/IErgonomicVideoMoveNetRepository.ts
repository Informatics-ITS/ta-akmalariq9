import { ErgonomicVideoMoveNet } from "../entities/ErgonomicVideoMoveNet";

export interface IErgonomicVideoMoveNetRepository {
  uploadErgonomicVideoMoveNet(
    userId: string,
    filePath: string
  ): Promise<{ id: string; userId: string; job_id: string }>;
  getErgonomicVideoMoveNetResult(
    userId: string,
    job_id: string
  ): Promise<ErgonomicVideoMoveNet | null>;
  getAllErgonomicsVideoMoveNetHistoryBySupervisorId(
    supervisorId: string
  ): Promise<any[]>;
  getErgonomicMoveNetVideoHistory(userId: string): Promise<any[]>;
}
