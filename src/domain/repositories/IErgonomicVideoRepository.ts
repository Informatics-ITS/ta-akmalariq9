import { ErgonomicVideo } from "../entities/ErgonomicVideo";

export interface IErgonomicVideoRepository {
  uploadErgonomicsVideo(
    userId: string,
    filePath: string
  ): Promise<{ id: string; userId: string; job_id: string }>;
  getErgonomicVideoResult(
    userId: string,
    job_id: string
  ): Promise<ErgonomicVideo | null>;
  getAllErgonomicsVideoHistoryBySupervisorId(
    supervisorId: string
  ): Promise<any[]>;
  getErgonomicVideoHistory(userId: string): Promise<any[]>;
}
