import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database";
import { UserModel } from "./UserModels";
import { CompanyModel } from "./CompanyModels";

interface SupervisorAttributes {
  id: string;
  userId: string;
  companyId: string;
}

interface SupervisorCreationAttributes
  extends Optional<SupervisorAttributes, "id"> {}

export class SupervisorModel
  extends Model<SupervisorAttributes, SupervisorCreationAttributes>
  implements SupervisorAttributes
{
  public id!: string;
  public userId!: string;
  public companyId!: string;
  public user?: UserModel;
  public company?: CompanyModel;
}

SupervisorModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "companies",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "supervisors",
    timestamps: false,
  }
);
