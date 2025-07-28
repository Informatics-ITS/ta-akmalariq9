import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

export class ErgonomicVideoModel extends Model {
  public id!: string;
  public userId!: string;
  public job_id!: string;
  public average_score_reba_final_score!: number;
  public average_score_leg_score!: number;
  public average_score_lower_arm_score!: number;
  public average_score_neck_score!: number;
  public average_score_trunk_score!: number;
  public average_score_upper_arm_score!: number;
  public average_score_wrist_score!: number;
  public average_score_rula_final_score!: number;
  public average_score_rula_leg_score!: number;
  public average_score_rula_lower_arm_score!: number;
  public average_score_rula_neck_score!: number;
  public average_score_rula_trunk_score!: number;
  public average_score_rula_upper_arm_score!: number;
  public average_score_rula_wrist_score!: number;
  public average_sudut_sudut_bahu!: number;
  public average_sudut_sudut_leher!: number;
  public average_sudut_sudut_lutut!: number;
  public average_sudut_sudut_pergelangan!: number;
  public average_sudut_sudut_punggung!: number;
  public average_sudut_sudut_siku!: number;
  public majority_score_reba_final_score!: number;
  public majority_score_reba_leg_score!: number;
  public majority_score_reba_lower_arm_score!: number;
  public majority_score_reba_neck_score!: number;
  public majority_score_reba_trunk_score!: number;
  public majority_score_reba_upper_arm_score!: number;
  public majority_score_reba_wrist_score!: number;
  public majority_score_rula_final_score!: number;
  public majority_score_rula_leg_score!: number;
  public majority_score_rula_lower_arm_score!: number;
  public majority_score_rula_neck_score!: number;
  public majority_score_rula_trunk_score!: number;
  public majority_score_rula_upper_arm_score!: number;
  public majority_score_rula_wrist_score!: number;
  public max_scores_reba_final_score!: number;
  public max_scores_reba_leg_score!: number;
  public max_scores_reba_lower_arm_score!: number;
  public max_scores_reba_neck_score!: number;
  public max_scores_reba_trunk_score!: number;
  public max_scores_reba_upper_arm_score!: number;
  public max_scores_reba_wrist_score!: number;
  public max_scores_rula_final_score!: number;
  public max_scores_rula_leg_score!: number;
  public max_scores_rula_lower_arm_score!: number;
  public max_scores_rula_neck_score!: number;
  public max_scores_rula_trunk_score!: number;
  public max_scores_rula_upper_arm_score!: number;
  public max_scores_rula_wrist_score!: number;
  public min_scores_reba_final_score!: number;
  public min_scores_reba_leg_score!: number;
  public min_scores_reba_lower_arm_score!: number;
  public min_scores_reba_neck_score!: number;
  public min_scores_reba_trunk_score!: number;
  public min_scores_reba_upper_arm_score!: number;
  public min_scores_reba_wrist_score!: number;
  public min_scores_rula_final_score!: number;
  public min_scores_rula_leg_score!: number;
  public min_scores_rula_lower_arm_score!: number;
  public min_scores_rula_neck_score!: number;
  public min_scores_rula_trunk_score!: number;
  public min_scores_rula_upper_arm_score!: number;
  public min_scores_rula_wrist_score!: number;
  public most_common_feedback!: string;
  public reba_summary!: string;
  public representative_image!: string;
  public rula_summary!: string;
  public summary!: string;
  public total_frames!: number;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ErgonomicVideoModel.init(
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
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    average_score_reba_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_score_rula_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_sudut_sudut_bahu: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_sudut_sudut_leher: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_sudut_sudut_lutut: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_sudut_sudut_pergelangan: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_sudut_sudut_punggung: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    average_sudut_sudut_siku: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_reba_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    majority_score_rula_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_reba_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_scores_rula_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_reba_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_final_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_leg_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_lower_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_neck_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_trunk_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_upper_arm_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    min_scores_rula_wrist_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    most_common_feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reba_summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    representative_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rula_summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    total_frames: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ergonomicvideo",
  }
);
