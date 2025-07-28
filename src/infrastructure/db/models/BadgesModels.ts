import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

export class BadgesModel extends Model {
  public id!: string;
  public name!: string;
  public quizCompleted!: number;
  public description?: string;
}

BadgesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quizCompleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "badges",
  }
);
