import { Notification } from "../entities/Notification";

export interface INotificationRepository {
  createNotification(notification: Notification): Promise<Notification>;
  getAllNotificationsBySupervisorId(
    supervisorId: string
  ): Promise<Notification[]>;
}
