import bcrypt from "bcrypt";
import { UserModel } from "../db/models/UserModels";

export const seedSuperadmin = async () => {
  try {
    const email = "nadirasuperadmin@gmail.com";
    const existing = await UserModel.findOne({ where: { email } });

    if (!existing) {
      const hashedPassword = await bcrypt.hash("akmalariq12", 10);

      await UserModel.create({
        name: "Nadira Superuser",
        email,
        password: hashedPassword,
        role: "superadmin",
      });

      console.log("✅ Superadmin seeded into UserModel!");
    } else {
      console.log("ℹ️ Superadmin already exists in UserModel.");
    }
  } catch (error) {
    console.error("❌ Error seeding superadmin into UserModel:", error);
  }
};
