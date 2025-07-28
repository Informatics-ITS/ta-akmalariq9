import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function ProtectEmployee(req: any, res: any, next: any) {
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
      message: "Internal server error. JWT secret is not configured.",
      data: null,
    });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userIdFromToken = decoded.userId;
    if (req.params.id !== userIdFromToken) {
      return res.status(403).json({
        error: true,
        message: "Permission denied. You can only access your own data.",
        data: null,
      });
    }

    res.locals.userId = userIdFromToken;
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Invalid token.",
      data: null,
    });
  }
}
