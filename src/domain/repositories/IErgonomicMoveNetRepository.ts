import { ErgonomicMoveNet } from "../entities/ErgonomicMoveNet";

export interface IErgonomicsMoveNetRepository {
  uploadErgonomicsMoveNet(
    userId: string,
    fileUrl: string
  ): Promise<ErgonomicMoveNet>;
  getErgonomicMoveNetHistory(userId: string): Promise<any[]>;
  getAllErgonomicMoveNetHistoryBySupervisorId(supervisorId: string): Promise<any[]>;
}
