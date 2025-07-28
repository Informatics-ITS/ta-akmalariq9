export class Ergonomic {
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

  constructor(
    id: string,
    userId: string,
    flags_sudut_bahu: boolean,
    flags_sudut_leher: boolean,
    flags_sudut_lutut: boolean,
    flags_sudut_pergelangan: boolean,
    flags_sudut_punggung: boolean,
    flags_sudut_siku: boolean,
    details_adjust_arm_supported: number,
    details_adjust_legs_feet: number,
    details_adjust_neck_twist: number,
    details_adjust_shoulder_raised: number,
    details_adjust_trunk_twist: number,
    details_adjust_wrist_twist: number,
    details_sudut_bahu: number,
    details_sudut_leher: number,
    details_sudut_lutut: number,
    details_sudut_pergelangan: number,
    details_sudut_punggung: number,
    details_sudut_siku: number,
    feedback: string,
    fileUrl: string,
    reba_final_score: number,
    reba_leg_score: number,
    reba_lower_arm_score: number,
    reba_neck_score: number,
    reba_trunk_score: number,
    reba_upper_arm_score: number,
    reba_wrist_score: number,
    rula_final_score: number,
    rula_leg_score: number,
    rula_lower_arm_score: number,
    rula_neck_score: number,
    rula_trunk_score: number,
    rula_upper_arm_score: number,
    rula_wrist_score: number,
    reba_summary: string,
    rula_summary: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.flags_sudut_bahu = flags_sudut_bahu;
    this.flags_sudut_leher = flags_sudut_leher;
    this.flags_sudut_lutut = flags_sudut_lutut;
    this.flags_sudut_pergelangan = flags_sudut_pergelangan;
    this.flags_sudut_punggung = flags_sudut_punggung;
    this.flags_sudut_siku = flags_sudut_siku;
    this.details_adjust_arm_supported = details_adjust_arm_supported;
    this.details_adjust_legs_feet = details_adjust_legs_feet;
    this.details_adjust_neck_twist = details_adjust_neck_twist;
    this.details_adjust_shoulder_raised = details_adjust_shoulder_raised;
    this.details_adjust_trunk_twist = details_adjust_trunk_twist;
    this.details_adjust_wrist_twist = details_adjust_wrist_twist;
    this.details_sudut_bahu = details_sudut_bahu;
    this.details_sudut_leher = details_sudut_leher;
    this.details_sudut_lutut = details_sudut_lutut;
    this.details_sudut_pergelangan = details_sudut_pergelangan;
    this.details_sudut_punggung = details_sudut_punggung;
    this.details_sudut_siku = details_sudut_siku;
    this.feedback = feedback;
    this.fileUrl = fileUrl;
    this.reba_final_score = reba_final_score;
    this.reba_leg_score = reba_leg_score;
    this.reba_lower_arm_score = reba_lower_arm_score;
    this.reba_neck_score = reba_neck_score;
    this.reba_trunk_score = reba_trunk_score;
    this.reba_upper_arm_score = reba_upper_arm_score;
    this.reba_wrist_score = reba_wrist_score;
    this.rula_final_score = rula_final_score;
    this.rula_leg_score = rula_leg_score;
    this.rula_lower_arm_score = rula_lower_arm_score;
    this.rula_neck_score = rula_neck_score;
    this.rula_trunk_score = rula_trunk_score;
    this.rula_upper_arm_score = rula_upper_arm_score;
    this.rula_wrist_score = rula_wrist_score;
    this.reba_summary = reba_summary;
    this.rula_summary = rula_summary;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
