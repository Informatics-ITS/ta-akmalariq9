import app from "./app";
import sequelize from "./config/database";
import { defineAssociations } from "./infrastructure/db/models/Associations";
import { seedSuperadmin } from "./infrastructure/seeders/superadminSeeders";

const PORT = process.env.PORT || 3000;
defineAssociations();

sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced successfully");
    if (
      process.env.SEED_SUPERADMIN === "true" &&
      process.env.NODE_ENV !== "test"
    ) {
      try {
        await seedSuperadmin();
      } catch (error) {
        console.error("Error seeding superadmin:", error);
      }
    } else {
      console.log("Superadmin seeding skipped");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
