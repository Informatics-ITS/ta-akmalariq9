// import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../../../config/database";
// import { UserModel } from "./UserModels";

// interface SuperadminAttributes {
//   id: string;
//   userId: string;
// }

// interface SuperadminCreationAttributes
//   extends Optional<SuperadminAttributes, "id"> {}

// export class SuperadminModel
//   extends Model<SuperadminAttributes, SuperadminCreationAttributes>
//   implements SuperadminAttributes
// {
//   public id!: string;
//   public userId!: string;
//   public user?: UserModel;
// }

// SuperadminModel.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       unique: true,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     tableName: "superadmins",
//     timestamps: false,
//   }
// );
