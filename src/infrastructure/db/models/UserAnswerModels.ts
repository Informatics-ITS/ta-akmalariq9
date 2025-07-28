import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import { QuizAttemptModel } from "./QuizAttemptModels";
import { OptionModel } from "./OptionModels";
import { UserModel } from "./UserModels"; // <-- import this!

export class UserAnswerModel extends Model {
  public id!: string;
  public attemptId!: string;
  public userId!: string;
  public selectedOptionId!: string;
  public isCorrect?: boolean;
  public option?: OptionModel;
}

UserAnswerModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    attemptId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "attempt_id",
      references: {
        model: QuizAttemptModel,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: UserModel,
        key: "id", // <-- add foreign key constraint here
      },
    },
    selectedOptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "selected_option_id",
      references: {
        model: OptionModel,
        key: "id",
      },
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_answers",
  }
);
