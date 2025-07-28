import { Router } from "express";
import { AuthMiddleware } from "../../infrastructure/middleware/AuthMiddleware";
import { VerifySuperadmin } from "../../infrastructure/middleware/VerifySuperadmin";
import { BadgesController } from "../controllers/BadgesController";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";

const router = Router();

router.post(
  "/create",
  VerifySuperadmin,
  verifyTokenBlacklist,
  BadgesController.createBadges
);

router.get(
  "/get-all-badges",
  AuthMiddleware,
  verifyTokenBlacklist,
  BadgesController.getAllBadges
);

router.put(
  "/:badgeId",
  VerifySuperadmin,
  verifyTokenBlacklist,
  BadgesController.updateBadges
);

router.get(
  "/:badgeId",
  AuthMiddleware,
  verifyTokenBlacklist,
  BadgesController.readBadges
);

router.delete(
  "/:badgeId",
  VerifySuperadmin,
  verifyTokenBlacklist,
  BadgesController.deleteBadges
);

export default router;
