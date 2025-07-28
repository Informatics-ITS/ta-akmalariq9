export class ErgonomicVideoMoveNet {
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

  constructor(
    id: string = "",
    userId: string = "",
    job_id: string = "",
    avg_component_scores_lower_arm: number = 0,
    avg_component_scores_neck: number = 0,
    avg_component_scores_trunk: number = 0,
    avg_component_scores_upper_arm: number = 0,
    avg_reba_score: number = 0,
    avg_risk_level: string = "",
    feedback: string = "",
    max_component_scores_lower_arm: number = 0,
    max_component_scores_neck: number = 0,
    max_component_scores_trunk: number = 0,
    max_component_scores_upper_arm: number = 0,
    max_reba_score: number = 0,
    max_risk_level: string = "",
    processed_frames: number = 0,
    risk_distribution_high_risk_frames: number = 0,
    risk_distribution_low_risk_frames: number = 0,
    risk_distribution_medium_risk_frames: number = 0,
    segment_end_frame: number = 0,
    segment_end_time: number = 0,
    segment_index: number = 0,
    segment_start_frame: number = 0,
    segment_start_time: number = 0,
    video_duration_seconds: number = 0,
    video_filename: string = "",
    video_fps: number = 0,
    video_segment_duration_minutes: number = 0,
    video_segments_count: number = 0,
    video_total_frames: number = 0,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.job_id = job_id;
    this.avg_component_scores_lower_arm = avg_component_scores_lower_arm;
    this.avg_component_scores_neck = avg_component_scores_neck;
    this.avg_component_scores_trunk = avg_component_scores_trunk;
    this.avg_component_scores_upper_arm = avg_component_scores_upper_arm;
    this.avg_reba_score = avg_reba_score;
    this.avg_risk_level = avg_risk_level;
    this.feedback = feedback;
    this.max_component_scores_lower_arm = max_component_scores_lower_arm;
    this.max_component_scores_neck = max_component_scores_neck;
    this.max_component_scores_trunk = max_component_scores_trunk;
    this.max_component_scores_upper_arm = max_component_scores_upper_arm;
    this.max_reba_score = max_reba_score;
    this.max_risk_level = max_risk_level;
    this.processed_frames = processed_frames;
    this.risk_distribution_high_risk_frames =
      risk_distribution_high_risk_frames;
    this.risk_distribution_low_risk_frames = risk_distribution_low_risk_frames;
    this.risk_distribution_medium_risk_frames =
      risk_distribution_medium_risk_frames;
    this.segment_end_frame = segment_end_frame;
    this.segment_end_time = segment_end_time;
    this.segment_index = segment_index;
    this.segment_start_frame = segment_start_frame;
    this.segment_start_time = segment_start_time;
    this.video_duration_seconds = video_duration_seconds;
    this.video_filename = video_filename;
    this.video_fps = video_fps;
    this.video_segment_duration_minutes = video_segment_duration_minutes;
    this.video_segments_count = video_segments_count;
    this.video_total_frames = video_total_frames;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
