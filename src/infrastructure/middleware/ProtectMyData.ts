import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function ProtectMyData(req: any, res: any, next: any) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Access denied. No token provided.",
      data: null,
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      error: true,
      message: "Internal server error. JWT secret is not configured.",
      data: null,
    });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userIdFromToken = decoded.userId;
    const roleFromToken = decoded.role;
    const positionIdFromToken = decoded.positionId;
    const companyIdFromToken = decoded.companyId;
    const supervisorIdFromToken = decoded.supervisorId;

    if (roleFromToken === "superadmin") {
      res.locals.userId = userIdFromToken;
      res.locals.role = roleFromToken;
      res.locals.positionId = positionIdFromToken;
      res.locals.companyId = companyIdFromToken;
      res.locals.supervisorId = supervisorIdFromToken;
      return next();
    }

    if (roleFromToken !== "supervisor" && roleFromToken !== "employee") {
      res.locals.userId = userIdFromToken;
      res.locals.role = roleFromToken;
      res.locals.positionId = positionIdFromToken;
      res.locals.companyId = companyIdFromToken;
      res.locals.supervisorId = supervisorIdFromToken;
      return next();
    }

    if (req.params.id !== positionIdFromToken) {
      return res.status(403).json({
        error: true,
        message: "Permission denied. You can only access your own data.",
        data: null,
      });
    }

    res.locals.userId = userIdFromToken;
    res.locals.positionId = positionIdFromToken;
    res.locals.companyId = companyIdFromToken;
    res.locals.role = roleFromToken;

    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Invalid token.",
      data: null,
    });
  }
}
