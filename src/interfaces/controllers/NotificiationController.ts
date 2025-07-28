import { Request, Response } from "express";
import { NotificationRepository } from "../../infrastructure/db/repositories/NotificationRepository";
import { GetAllNotificationsBySupervisorId } from "../../domain/usecases/Notification/GetAllNotificiationsBySupervisorId";
import sendResponse from "../../shared/utils/ResponseHelper";

const notificationRepository = new NotificationRepository();

export class NotificationController {
  static async getAllNotificationsBySupervisorId(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.supervisorId;
      if (!supervisorId) {
        return sendResponse(res, 400, "Supervisor ID is required.");
      }

      const useCase = new GetAllNotificationsBySupervisorId(
        notificationRepository
      );
      const notifications = await useCase.execute(supervisorId);
      return sendResponse(
        res,
        200,
        "Notifications fetched successfully.",
        notifications
      );
    } catch (error) {
      console.error(
        "[NotificationController] getAllNotificationsBySupervisorId error",
        error
      );
      return sendResponse(
        res,
        500,
        error instanceof Error ? error.message : "Internal Server Error"
      );
    }
  }
}
