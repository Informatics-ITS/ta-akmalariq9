export class ErgonomicVideo {
  public id: string;
  public userId: string;
  public job_id: string;
  public average_score_reba_final_score: number;
  public average_score_leg_score: number;
  public average_score_lower_arm_score: number;
  public average_score_neck_score: number;
  public average_score_trunk_score: number;
  public average_score_upper_arm_score: number;
  public average_score_wrist_score: number;
  public average_score_rula_final_score: number;
  public average_score_rula_leg_score: number;
  public average_score_rula_lower_arm_score: number;
  public average_score_rula_neck_score: number;
  public average_score_rula_trunk_score: number;
  public average_score_rula_upper_arm_score: number;
  public average_score_rula_wrist_score: number;
  public average_sudut_sudut_bahu: number;
  public average_sudut_sudut_leher: number;
  public average_sudut_sudut_lutut: number;
  public average_sudut_sudut_pergelangan: number;
  public average_sudut_sudut_punggung: number;
  public average_sudut_sudut_siku: number;
  public majority_score_reba_final_score: number;
  public majority_score_reba_leg_score: number;
  public majority_score_reba_lower_arm_score: number;
  public majority_score_reba_neck_score: number;
  public majority_score_reba_trunk_score: number;
  public majority_score_reba_upper_arm_score: number;
  public majority_score_reba_wrist_score: number;
  public majority_score_rula_final_score: number;
  public majority_score_rula_leg_score: number;
  public majority_score_rula_lower_arm_score: number;
  public majority_score_rula_neck_score: number;
  public majority_score_rula_trunk_score: number;
  public majority_score_rula_upper_arm_score: number;
  public majority_score_rula_wrist_score: number;
  public max_scores_reba_final_score: number;
  public max_scores_reba_leg_score: number;
  public max_scores_reba_lower_arm_score: number;
  public max_scores_reba_neck_score: number;
  public max_scores_reba_trunk_score: number;
  public max_scores_reba_upper_arm_score: number;
  public max_scores_reba_wrist_score: number;
  public max_scores_rula_final_score: number;
  public max_scores_rula_leg_score: number;
  public max_scores_rula_lower_arm_score: number;
  public max_scores_rula_neck_score: number;
  public max_scores_rula_trunk_score: number;
  public max_scores_rula_upper_arm_score: number;
  public max_scores_rula_wrist_score: number;
  public min_scores_reba_final_score: number;
  public min_scores_reba_leg_score: number;
  public min_scores_reba_lower_arm_score: number;
  public min_scores_reba_neck_score: number;
  public min_scores_reba_trunk_score: number;
  public min_scores_reba_upper_arm_score: number;
  public min_scores_reba_wrist_score: number;
  public min_scores_rula_final_score: number;
  public min_scores_rula_leg_score: number;
  public min_scores_rula_lower_arm_score: number;
  public min_scores_rula_neck_score: number;
  public min_scores_rula_trunk_score: number;
  public min_scores_rula_upper_arm_score: number;
  public min_scores_rula_wrist_score: number;
  public most_common_feedback: string;
  public reba_summary: string;
  public representative_image: string;
  public rula_summary: string;
  public summary: string;
  public total_frames: number;
  public status: string;

  constructor(
    id: string,
    userId: string,
    job_id: string,
    average_score_reba_final_score?: number,
    average_score_leg_score?: number,
    average_score_lower_arm_score?: number,
    average_score_neck_score?: number,
    average_score_trunk_score?: number,
    average_score_upper_arm_score?: number,
    average_score_wrist_score?: number,
    average_score_rula_final_score?: number,
    average_score_rula_leg_score?: number,
    average_score_rula_lower_arm_score?: number,
    average_score_rula_neck_score?: number,
    average_score_rula_trunk_score?: number,
    average_score_rula_upper_arm_score?: number,
    average_score_rula_wrist_score?: number,
    average_sudut_sudut_bahu?: number,
    average_sudut_sudut_leher?: number,
    average_sudut_sudut_lutut?: number,
    average_sudut_sudut_pergelangan?: number,
    average_sudut_sudut_punggung?: number,
    average_sudut_sudut_siku?: number,
    majority_score_reba_final_score?: number,
    majority_score_reba_leg_score?: number,
    majority_score_reba_lower_arm_score?: number,
    majority_score_reba_neck_score?: number,
    majority_score_reba_trunk_score?: number,
    majority_score_reba_upper_arm_score?: number,
    majority_score_reba_wrist_score?: number,
    majority_score_rula_final_score?: number,
    majority_score_rula_leg_score?: number,
    majority_score_rula_lower_arm_score?: number,
    majority_score_rula_neck_score?: number,
    majority_score_rula_trunk_score?: number,
    majority_score_rula_upper_arm_score?: number,
    majority_score_rula_wrist_score?: number,
    max_scores_reba_final_score?: number,
    max_scores_reba_leg_score?: number,
    max_scores_reba_lower_arm_score?: number,
    max_scores_reba_neck_score?: number,
    max_scores_reba_trunk_score?: number,
    max_scores_reba_upper_arm_score?: number,
    max_scores_reba_wrist_score?: number,
    max_scores_rula_final_score?: number,
    max_scores_rula_leg_score?: number,
    max_scores_rula_lower_arm_score?: number,
    max_scores_rula_neck_score?: number,
    max_scores_rula_trunk_score?: number,
    max_scores_rula_upper_arm_score?: number,
    max_scores_rula_wrist_score?: number,
    min_scores_reba_final_score?: number,
    min_scores_reba_leg_score?: number,
    min_scores_reba_lower_arm_score?: number,
    min_scores_reba_neck_score?: number,
    min_scores_reba_trunk_score?: number,
    min_scores_reba_upper_arm_score?: number,
    min_scores_reba_wrist_score?: number,
    min_scores_rula_final_score?: number,
    min_scores_rula_leg_score?: number,
    min_scores_rula_lower_arm_score?: number,
    min_scores_rula_neck_score?: number,
    min_scores_rula_trunk_score?: number,
    min_scores_rula_upper_arm_score?: number,
    min_scores_rula_wrist_score?: number,
    most_common_feedback?: string,
    reba_summary?: string,
    representative_image?: string,
    rula_summary?: string,
    summary?: string,
    total_frames?: number,
    status?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.job_id = job_id;
    this.average_score_reba_final_score = average_score_reba_final_score ?? 0;
    this.average_score_leg_score = average_score_leg_score ?? 0;
    this.average_score_lower_arm_score = average_score_lower_arm_score ?? 0;
    this.average_score_neck_score = average_score_neck_score ?? 0;
    this.average_score_trunk_score = average_score_trunk_score ?? 0;
    this.average_score_upper_arm_score = average_score_upper_arm_score ?? 0;
    this.average_score_wrist_score = average_score_wrist_score ?? 0;
    this.average_score_rula_final_score = average_score_rula_final_score ?? 0;
    this.average_score_rula_leg_score = average_score_rula_leg_score ?? 0;
    this.average_score_rula_lower_arm_score =
      average_score_rula_lower_arm_score ?? 0;
    this.average_score_rula_neck_score = average_score_rula_neck_score ?? 0;
    this.average_score_rula_trunk_score = average_score_rula_trunk_score ?? 0;
    this.average_score_rula_upper_arm_score =
      average_score_rula_upper_arm_score ?? 0;
    this.average_score_rula_wrist_score = average_score_rula_wrist_score ?? 0;
    this.average_sudut_sudut_bahu = average_sudut_sudut_bahu ?? 0;
    this.average_sudut_sudut_leher = average_sudut_sudut_leher ?? 0;
    this.average_sudut_sudut_lutut = average_sudut_sudut_lutut ?? 0;
    this.average_sudut_sudut_pergelangan = average_sudut_sudut_pergelangan ?? 0;
    this.average_sudut_sudut_punggung = average_sudut_sudut_punggung ?? 0;
    this.average_sudut_sudut_siku = average_sudut_sudut_siku ?? 0;
    this.majority_score_reba_final_score = majority_score_reba_final_score ?? 0;
    this.majority_score_reba_leg_score = majority_score_reba_leg_score ?? 0;
    this.majority_score_reba_lower_arm_score =
      majority_score_reba_lower_arm_score ?? 0;
    this.majority_score_reba_neck_score = majority_score_reba_neck_score ?? 0;
    this.majority_score_reba_trunk_score = majority_score_reba_trunk_score ?? 0;
    this.majority_score_reba_upper_arm_score =
      majority_score_reba_upper_arm_score ?? 0;
    this.majority_score_reba_wrist_score = majority_score_reba_wrist_score ?? 0;
    this.majority_score_rula_final_score = majority_score_rula_final_score ?? 0;
    this.majority_score_rula_leg_score = majority_score_rula_leg_score ?? 0;
    this.majority_score_rula_lower_arm_score =
      majority_score_rula_lower_arm_score ?? 0;
    this.majority_score_rula_neck_score = majority_score_rula_neck_score ?? 0;
    this.majority_score_rula_trunk_score = majority_score_rula_trunk_score ?? 0;
    this.majority_score_rula_upper_arm_score =
      majority_score_rula_upper_arm_score ?? 0;
    this.majority_score_rula_wrist_score = majority_score_rula_wrist_score ?? 0;
    this.max_scores_reba_final_score = max_scores_reba_final_score ?? 0;
    this.max_scores_reba_leg_score = max_scores_reba_leg_score ?? 0;
    this.max_scores_reba_lower_arm_score = max_scores_reba_lower_arm_score ?? 0;
    this.max_scores_reba_neck_score = max_scores_reba_neck_score ?? 0;
    this.max_scores_reba_trunk_score = max_scores_reba_trunk_score ?? 0;
    this.max_scores_reba_upper_arm_score = max_scores_reba_upper_arm_score ?? 0;
    this.max_scores_reba_wrist_score = max_scores_reba_wrist_score ?? 0;
    this.max_scores_rula_final_score = max_scores_rula_final_score ?? 0;
    this.max_scores_rula_leg_score = max_scores_rula_leg_score ?? 0;
    this.max_scores_rula_lower_arm_score = max_scores_rula_lower_arm_score ?? 0;
    this.max_scores_rula_neck_score = max_scores_rula_neck_score ?? 0;
    this.max_scores_rula_trunk_score = max_scores_rula_trunk_score ?? 0;
    this.max_scores_rula_upper_arm_score = max_scores_rula_upper_arm_score ?? 0;
    this.max_scores_rula_wrist_score = max_scores_rula_wrist_score ?? 0;
    this.min_scores_reba_final_score = min_scores_reba_final_score ?? 0;
    this.min_scores_reba_leg_score = min_scores_reba_leg_score ?? 0;
    this.min_scores_reba_lower_arm_score = min_scores_reba_lower_arm_score ?? 0;
    this.min_scores_reba_neck_score = min_scores_reba_neck_score ?? 0;
    this.min_scores_reba_trunk_score = min_scores_reba_trunk_score ?? 0;
    this.min_scores_reba_upper_arm_score = min_scores_reba_upper_arm_score ?? 0;
    this.min_scores_reba_wrist_score = min_scores_reba_wrist_score ?? 0;
    this.min_scores_rula_final_score = min_scores_rula_final_score ?? 0;
    this.min_scores_rula_leg_score = min_scores_rula_leg_score ?? 0;
    this.min_scores_rula_lower_arm_score = min_scores_rula_lower_arm_score ?? 0;
    this.min_scores_rula_neck_score = min_scores_rula_neck_score ?? 0;
    this.min_scores_rula_trunk_score = min_scores_rula_trunk_score ?? 0;
    this.min_scores_rula_upper_arm_score = min_scores_rula_upper_arm_score ?? 0;
    this.min_scores_rula_wrist_score = min_scores_rula_wrist_score ?? 0;
    this.most_common_feedback = most_common_feedback ?? "0";
    this.reba_summary = reba_summary ?? "0";
    this.representative_image = representative_image ?? "0";
    this.rula_summary = rula_summary ?? "0";
    this.summary = summary ?? "0";
    this.total_frames = total_frames ?? 0;
    this.status = status ?? "0";
  }
}
