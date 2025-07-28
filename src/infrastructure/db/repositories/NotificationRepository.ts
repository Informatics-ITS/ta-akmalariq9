import { Notification } from "../../../domain/entities/Notification";
import { INotificationRepository } from "../../../domain/repositories/INotificationRepository";
import { NotificationModel } from "../models/NotificationModels";
import { v4 as uuidv4 } from "uuid";

export class NotificationRepository implements INotificationRepository {
  async createNotification(notification: Notification): Promise<Notification> {
    const created = await NotificationModel.create({
      id: notification.id || uuidv4(),
      category: notification.category,
      message: notification.message,
      supervisorId: notification.supervisorId,
    });

    return new Notification(
      created.id,
      created.category,
      created.message!,
      created.supervisorId
    );
  }

  async getAllNotificationsBySupervisorId(
    supervisorId: string
  ): Promise<Notification[]> {
    const notifications = await NotificationModel.findAll({
      where: { supervisorId },
      order: [["createdAt", "DESC"]],
    });

    return notifications.map(
      (n) => new Notification(n.id, n.category, n.message || "", n.supervisorId)
    );
  }
}
