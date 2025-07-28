import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

export class ErgonomicMoveNetModel extends Model {
  public id!: string;
  public userId!: string;
  public angle_values_left_leg!: number;
  public angle_values_left_lower_arm!: number;
  public angle_values_left_upper_arm!: number;
  public angle_values_neck!: number;
  public angle_values_right_leg!: number;
  public angle_values_right_lower_arm!: number;
  public angle_values_right_upper_arm!: number;
  public angle_values_waist!: number;
  public component_scores_leg_score!: number;
  public component_scores_lower_arm_score!: number;
  public component_scores_neck_score!: number;
  public component_scores_reba_score!: number;
  public component_scores_trunk_score!: number;
  public component_scores_upper_arm_score!: number;
  public feedback!: string;
  public reba_score!: number;
  public risk_level!: string;
  public visualization_path!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ErgonomicMoveNetModel.init(
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
    angle_values_left_leg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_left_lower_arm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_left_upper_arm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_neck: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_right_leg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_right_lower_arm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_right_upper_arm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    angle_values_waist: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    component_scores_leg_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    component_scores_lower_arm_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    component_scores_neck_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    component_scores_reba_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    component_scores_trunk_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    component_scores_upper_arm_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reba_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    risk_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visualization_path: {
      type: DataTypes.TEXT,
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
    tableName: "ergonomic_movenet",
  }
);
