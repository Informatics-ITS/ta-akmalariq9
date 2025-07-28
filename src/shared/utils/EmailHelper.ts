import { UserModel } from "../../infrastructure/db/models/UserModels";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const existingUser = await UserModel.findOne({ where: { email } });
  return !!existingUser; // true if email already exists
};
