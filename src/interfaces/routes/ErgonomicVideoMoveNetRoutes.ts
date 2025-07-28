import { Router } from "express";
import { upload } from "../../infrastructure/middleware/Multer";
import { VerifyUser } from "../../infrastructure/middleware/VerifyUser";
import { AuthMiddleware } from "../../infrastructure/middleware/AuthMiddleware";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";
import { VerifyEmployeeOrSupervisor } from "../../infrastructure/middleware/VerifyEmployeeOrSpv";
import { ErgonomicVideoMoveNetController } from "../controllers/ErgonomicVideoMoveNetController";

const router = Router();

router.post(
  "/upload",
  upload.single("video"),
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicVideoMoveNetController.uploadErgonomicVideoMoveNet
);

router.get(
  "/result",
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicVideoMoveNetController.getErgonomicVideoMoveNetResult
);

router.get(
  "/movenet-video-history",
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicVideoMoveNetController.getErgonomicVideoMoveNetHistoryProfile
);

router.get(
  "/all-employee-history",
  VerifyUser,
  ErgonomicVideoMoveNetController.getAllErgonomicVideoMoveNetHistoryBySupervisor
);

router.get(
  "/history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicVideoMoveNetController.getErgonomicVideoMoveNetHistory
);

router.get(
  "/download-history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicVideoMoveNetController.downloadErgonomicVideoMoveNetDataPDF
);

export default router;
