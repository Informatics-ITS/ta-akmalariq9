import { Router } from "express";
import { ErgonomicController } from "../controllers/ErgonomicController";
import { upload } from "../../infrastructure/middleware/Multer";
import { VerifyUser } from "../../infrastructure/middleware/VerifyUser";
import { AuthMiddleware } from "../../infrastructure/middleware/AuthMiddleware";
import { VerifyEmployeeOrSupervisor } from "../../infrastructure/middleware/VerifyEmployeeOrSpv";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";

const router = Router();

router.post(
  "/upload",
  upload.single("image"),
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicController.uploadErgonomic
);

router.get(
  "/ergonomic-history",
  AuthMiddleware,
  ErgonomicController.getErgonomicHistoryProfile
);

router.get(
  "/history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicController.getErgonomicHistory
);

router.get(
  "/all-employee-history",
  VerifyUser,
  ErgonomicController.getAllErgonomicHistoryBySupervisor
);

router.get(
  "/download-history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicController.downloadErgonomicDataPDF
);

export default router;
