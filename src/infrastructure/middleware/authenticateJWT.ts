import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateJWT(req: any, res: any, next: any) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      error: true,
      message: "Access denied. No token provided.",
      data: null,
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      error: true,
      message: "JWT secret is not configured.",
      data: null,
    });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({
        error: true,
        message: "Invalid token.",
        data: null,
      });
    }

    if (decoded.role !== "supervisor") {
      return res.status(403).json({
        error: true,
        message: "Permission denied. Only supervisors can perform this action.",
        data: null,
      });
    }

    console.log("Decoded JWT:", decoded);
    res.locals.positionId = decoded.positionId;
    res.locals.supervisorId = decoded.userId;
    res.locals.companyId = decoded.companyId;
    res.locals.role = decoded.role;
    next();
  });
}
