import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

interface Payload {
  userId: string;
  positionId: string;
  role: string;
  companyId: string | null;
  supervisorId: string | null;
}

export function createToken(payload: Payload): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(token: string): Payload {
  return jwt.verify(token, JWT_SECRET as string) as Payload;
}
