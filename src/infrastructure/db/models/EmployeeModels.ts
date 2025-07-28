import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database";
import { UserModel } from "./UserModels";
import { CompanyModel } from "./CompanyModels";
import { DivisionModel } from "./DivisionModels";
import { SupervisorModel } from "./SupervisorModels";

interface EmployeeAttributes {
  id: string;
  userId: string;
  supervisorId: string;
  companyId: string;
  divisionId: string;
}

interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, "id"> {}

export class EmployeeModel
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: string;
  public userId!: string;
  public supervisorId!: string;
  public companyId!: string;
  public divisionId!: string;

  public user?: UserModel;
  public company?: CompanyModel;
  public division?: DivisionModel;
  public supervisor?: SupervisorModel & { user?: UserModel };
}

EmployeeModel.init(
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
      references: {
        model: "users",
        key: "id",
      },
    },
    supervisorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "supervisors",
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
    divisionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "divisions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "employees",
    timestamps: false,
  }
);
