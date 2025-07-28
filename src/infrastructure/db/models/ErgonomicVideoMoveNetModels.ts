import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

export class ErgonomicVideoMoveNetModel extends Model {
  public id!: string;
  public userId!: string;
  public job_id!: string;
  public avg_component_scores_lower_arm!: number;
  public avg_component_scores_neck!: number;
  public avg_component_scores_trunk!: number;
  public avg_component_scores_upper_arm!: number;
  public avg_reba_score!: number;
  public avg_risk_level!: string;
  public feedback!: string;
  public max_component_scores_lower_arm!: number;
  public max_component_scores_neck!: number;
  public max_component_scores_trunk!: number;
  public max_component_scores_upper_arm!: number;
  public max_reba_score!: number;
  public max_risk_level!: string;
  public processed_frames!: number;
  public risk_distribution_high_risk_frames!: number;
  public risk_distribution_low_risk_frames!: number;
  public risk_distribution_medium_risk_frames!: number;
  public segment_end_frame!: number;
  public segment_end_time!: number;
  public segment_index!: number;
  public segment_start_frame!: number;
  public segment_start_time!: number;
  public video_duration_seconds!: number;
  public video_filename!: string;
  public video_fps!: number;
  public video_segment_duration_minutes!: number;
  public video_segments_count!: number;
  public video_total_frames!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ErgonomicVideoMoveNetModel.init(
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    avg_component_scores_lower_arm: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avg_component_scores_neck: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avg_component_scores_trunk: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avg_component_scores_upper_arm: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avg_reba_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avg_risk_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    max_component_scores_lower_arm: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_component_scores_neck: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_component_scores_trunk: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_component_scores_upper_arm: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_reba_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    max_risk_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    processed_frames: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    risk_distribution_high_risk_frames: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    risk_distribution_low_risk_frames: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    risk_distribution_medium_risk_frames: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    segment_end_frame: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    segment_end_time: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    segment_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    segment_start_frame: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    segment_start_time: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    video_duration_seconds: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    video_filename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video_fps: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    video_segment_duration_minutes: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    video_segments_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    video_total_frames: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "ergonomic_video_movenet",
  }
);
