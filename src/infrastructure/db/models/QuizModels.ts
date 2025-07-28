import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import { UserModel } from "./UserModels";

export class QuizModel extends Model {
  public id!: string;
  public title!: string;
  public authorType!: "supervisor" | "superadmin";
  public authorId!: string;
  public author?: UserModel;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuizModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorType: {
      type: DataTypes.ENUM("supervisor", "superadmin"),
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "quiz",
  }
);
