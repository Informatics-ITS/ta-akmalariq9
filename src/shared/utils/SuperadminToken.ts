import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export function superAdminToken(userId: string, role: string): string {
  const payload = { userId, role };

  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" });
}

export function VerifySuperAdminToken(token: string) {
  return jwt.verify(token, JWT_SECRET as string);
}
