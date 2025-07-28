import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

export class NotificationModel extends Model {
  public id!: string;
  public category!: string;
  public message?: string;
  public supervisorId!: string;
}

NotificationModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category: {
      type: DataTypes.ENUM("New Quiz", "Analysis Schedule"),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supervisorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "notifications",
  }
);
