import { Router } from "express";
import { upload } from "../../infrastructure/middleware/Multer";
import { VerifyUser } from "../../infrastructure/middleware/VerifyUser";
import { AuthMiddleware } from "../../infrastructure/middleware/AuthMiddleware";
import { VerifyEmployeeOrSupervisor } from "../../infrastructure/middleware/VerifyEmployeeOrSpv";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";
import { ErgonomicVideoController } from "../controllers/ErgonomicVideoController";

const router = Router();

router.post(
  "/upload",
  upload.single("video"),
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicVideoController.uploadErgonomicVideo
);

router.get(
  "/ergonomic-video-history",
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicVideoController.getErgonomicVideoHistoryProfile
);

router.get(
  "/result",
  AuthMiddleware,
  verifyTokenBlacklist,
  ErgonomicVideoController.getErgonomicVideoResult
);

router.get(
  "/all-employee-history",
  VerifyUser,
  ErgonomicVideoController.getAllErgonomicVideoHistory
);

router.get(
  "/history/:id",
  VerifyEmployeeOrSupervisor,
  ErgonomicVideoController.getErgonomicVideoHistory
);

// router.get(
//   "/download-history/:id",
//   VerifyEmployeeOrSupervisor,
//   ErgonomicController.downloadErgonomicDataPDF
// );

export default router;
