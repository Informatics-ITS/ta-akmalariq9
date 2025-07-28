import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import { UserModel } from "./UserModels";
import { BadgesModel } from "./BadgesModels";

export class UserBadgesModel extends Model {
  public id!: string;
  public userId!: string;
  public badgeId!: string;
  public badge?: BadgesModel;
  public user?: UserModel;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserBadgesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: UserModel,
        key: "id",
      },
      allowNull: false,
    },
    badgeId: {
      type: DataTypes.UUID,
      references: {
        model: BadgesModel,
        key: "id",
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "user_badges",
    timestamps: true,
  }
);
