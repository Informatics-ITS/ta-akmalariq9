export class ErgonomicMoveNet {
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

  constructor(
    id: string,
    userId: string,
    angle_values_left_leg: number,
    angle_values_left_lower_arm: number,
    angle_values_left_upper_arm: number,
    angle_values_neck: number,
    angle_values_right_leg: number,
    angle_values_right_lower_arm: number,
    angle_values_right_upper_arm: number,
    angle_values_waist: number,
    component_scores_leg_score: number,
    component_scores_lower_arm_score: number,
    component_scores_neck_score: number,
    component_scores_reba_score: number,
    component_scores_trunk_score: number,
    component_scores_upper_arm_score: number,
    feedback: string,
    reba_score: number,
    risk_level: string,
    visualization_path: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.angle_values_left_leg = angle_values_left_leg;
    this.angle_values_left_lower_arm = angle_values_left_lower_arm;
    this.angle_values_left_upper_arm = angle_values_left_upper_arm;
    this.angle_values_neck = angle_values_neck;
    this.angle_values_right_leg = angle_values_right_leg;
    this.angle_values_right_lower_arm = angle_values_right_lower_arm;
    this.angle_values_right_upper_arm = angle_values_right_upper_arm;
    this.angle_values_waist = angle_values_waist;
    this.component_scores_leg_score = component_scores_leg_score;
    this.component_scores_lower_arm_score = component_scores_lower_arm_score;
    this.component_scores_neck_score = component_scores_neck_score;
    this.component_scores_reba_score = component_scores_reba_score;
    this.component_scores_trunk_score = component_scores_trunk_score;
    this.component_scores_upper_arm_score = component_scores_upper_arm_score;
    this.feedback = feedback;
    this.reba_score = reba_score;
    this.risk_level = risk_level;
    this.visualization_path = visualization_path;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
