import { Router } from "express";
import { ErgonomicController } from "../controllers/ErgonomicController";
import { upload } from "../../infrastructure/middleware/Multer";
import { VerifyUser } from "../../infrastructure/middleware/VerifyUser";
import { AuthMiddleware } from "../../infrastructure/middleware/AuthMiddleware";
import { VerifyEmployeeOrSupervisor } from "../../infrastructure/middleware/VerifyEmployeeOrSpv";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";
import { ErgonomicMoveNetController } from "../controllers/ErgonomicMoveNetController";

const router = Router();

router.post(
  "/upload",
  upload.single("image"),
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicMoveNetController.uploadErgonomicMoveNet
);

router.get(
  "/ergonomic-movenet-history",
  AuthMiddleware,
  ErgonomicMoveNetController.getErgonomicMoveNetHistoryProfile
);

router.get(
  "/history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicMoveNetController.getErgonomicMoveNetHistory
);

router.get(
  "/all-employee-history",
  VerifyUser,
  ErgonomicMoveNetController.getAllErgonomicHistoryBySupervisor
);

router.get(
  "/download-history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicMoveNetController.downloadErgonomicMovenetDataPDF
);

export default router;
