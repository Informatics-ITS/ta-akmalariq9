import { Router } from "express";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";
import { ProtectQuiz } from "../../infrastructure/middleware/ProtectQuiz";
import { NotificationController } from "../controllers/NotificiationController";

const router = Router();

router.get(
  "/get-all-notification",
  ProtectQuiz,
  verifyTokenBlacklist,
  NotificationController.getAllNotificationsBySupervisorId
);

export default router;
