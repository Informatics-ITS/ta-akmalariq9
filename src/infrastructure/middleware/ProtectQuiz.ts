import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { EmployeeModel } from "../db/models/EmployeeModels";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function ProtectQuiz(req: any, res: any, next: any) {
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
    res.locals.userId = decoded.userId;
    res.locals.role = decoded.role;
    res.locals.positionId = decoded.positionId;
    res.locals.supervisorId = decoded.supervisorId || null;
    res.locals.companyId = decoded.companyId || null;

    if (decoded.role === "employee") {
      const employee = await EmployeeModel.findOne({
        where: { id: decoded.userId },
        attributes: ["supervisorId"],
      });

      if (employee) {
        res.locals.supervisorId = employee.supervisorId;
      }
    }
    console.log("Decoded token:", decoded);
    console.log("Response locals:", res.locals);
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Invalid token.",
      data: null,
    });
  }
}
