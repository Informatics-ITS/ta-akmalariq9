import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { verifyTokenBlacklist } from "../../infrastructure/middleware/VerifyTokenBlacklist";
import { authenticateJWT } from "../../infrastructure/middleware/authenticateJWT";
import { validateEmployeeIdParam } from "../../infrastructure/middleware/ValidateEmployeeId";
import { VerifyEmployeeOrSupervisor } from "../../infrastructure/middleware/VerifyEmployeeOrSpv";
import { ProtectMyData } from "../../infrastructure/middleware/ProtectMyData";
import { AuthMiddleware } from "../../infrastructure/middleware/AuthMiddleware";

const router = Router();

router.post(
  "/register",
  authenticateJWT,
  verifyTokenBlacklist,
  EmployeeController.registerEmployee
);

router.get(
  "/profile",
  AuthMiddleware,
  verifyTokenBlacklist,
  EmployeeController.getProfile
);

router.get(
  "/:id",
  validateEmployeeIdParam,
  VerifyEmployeeOrSupervisor,
  verifyTokenBlacklist,
  EmployeeController.getEmployee
);

router.put(
  "/:id",
  validateEmployeeIdParam,
  VerifyEmployeeOrSupervisor,
  verifyTokenBlacklist,
  EmployeeController.updateEmployee
);

router.delete(
  "/:id",
  validateEmployeeIdParam,
  VerifyEmployeeOrSupervisor,
  verifyTokenBlacklist,
  EmployeeController.deleteEmployee
);

export default router;
