import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

export class ErgonomicModel extends Model {
  public id!: string;
  public userId!: string;
  public flags_sudut_bahu!: boolean;
  public flags_sudut_leher!: boolean;
  public flags_sudut_lutut!: boolean;
  public flags_sudut_pergelangan!: boolean;
  public flags_sudut_punggung!: boolean;
  public flags_sudut_siku!: boolean;
  public details_adjust_arm_supported!: number;
  public details_adjust_legs_feet!: number;
  public details_adjust_neck_twist!: number;
  public details_adjust_shoulder_raised!: number;
  public details_adjust_trunk_twist!: number;
  public details_adjust_wrist_twist!: number;
  public details_sudut_bahu!: number;
  public details_sudut_leher!: number;
  public details_sudut_lutut!: number;
  public details_sudut_pergelangan!: number;
  public details_sudut_punggung!: number;
  public details_sudut_siku!: number;
  public feedback!: string;
  public fileUrl!: string;
  public reba_final_score!: number;
  public reba_leg_score!: number;
  public reba_lower_arm_score!: number;
  public reba_neck_score!: number;
  public reba_trunk_score!: number;
  public reba_upper_arm_score!: number;
  public reba_wrist_score!: number;
  public rula_final_score!: number;
  public rula_leg_score!: number;
  public rula_lower_arm_score!: number;
  public rula_neck_score!: number;
  public rula_trunk_score!: number;
  public rula_upper_arm_score!: number;
  public rula_wrist_score!: number;
  public reba_summary!: string;
  public rula_summary!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ErgonomicModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    flags_sudut_bahu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flags_sudut_leher: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flags_sudut_lutut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flags_sudut_pergelangan: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flags_sudut_punggung: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flags_sudut_siku: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    details_adjust_arm_supported: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details_adjust_legs_feet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details_adjust_neck_twist: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details_adjust_shoulder_raised: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details_adjust_trunk_twist: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details_adjust_wrist_twist: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details_sudut_bahu: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    details_sudut_leher: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    details_sudut_lutut: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    details_sudut_pergelangan: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    details_sudut_punggung: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    details_sudut_siku: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reba_final_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_leg_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_lower_arm_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_neck_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_trunk_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_upper_arm_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_wrist_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_final_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_leg_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_lower_arm_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_neck_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_trunk_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_upper_arm_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rula_wrist_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reba_summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rula_summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "ergonomic",
  }
);
