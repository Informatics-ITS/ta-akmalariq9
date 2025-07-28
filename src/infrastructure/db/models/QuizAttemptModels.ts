import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import { QuizModel } from "./QuizModels";

export class QuizAttemptModel extends Model {
  public id!: string;
  public quizId!: string;
  public userId!: string; // Can be from either Employee or User
  public score?: number;
  public quiz?: QuizModel;
  public createdAt!: Date;
  public updatedAt!: Date;
}

QuizAttemptModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quizId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: QuizModel,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "quiz_attempts",
  }
);
