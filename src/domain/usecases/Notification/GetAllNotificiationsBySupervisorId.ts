import { INotificationRepository } from "../../repositories/INotificationRepository";
import { Notification } from "../../entities/Notification";

export class GetAllNotificationsBySupervisorId {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(supervisorId: string): Promise<Notification[]> {
    return this.notificationRepository.getAllNotificationsBySupervisorId(
      supervisorId
    );
  }
}
