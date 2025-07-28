import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { IErgonomicVideoMoveNetRepository } from "../../../domain/repositories/IErgonomicVideoMoveNetRepository";
import { ErgonomicVideoMoveNetModel } from "../models/ErgonomicVideoMoveNetModels";
import { ErgonomicVideoMoveNet } from "../../../domain/entities/ErgonomicVideoMoveNet";
import { EmployeeModel } from "../models/EmployeeModels";
import { UserModel } from "../models/UserModels";

export class ErgonomicVideoMoveNetRepository
  implements IErgonomicVideoMoveNetRepository
{
  async uploadErgonomicVideoMoveNet(
    userId: string,
    filePath: string
  ): Promise<{ id: string; userId: string; job_id: string }> {
    const form = new FormData();
    form.append("video", fs.createReadStream(filePath));

    try {
      const { data } = await axios.post(
        "https://vps.danar.site/model2/predict/video",
        form,
        {
          headers: form.getHeaders(),
        }
      );

      const result = {
        id: data.id,
        userId: userId,
        job_id: data.job_id,
      };

      const record = await ErgonomicVideoMoveNetModel.create({
        userId: result.userId,
        job_id: result.job_id,
      });

      const ergonomicVideo = new ErgonomicVideoMoveNet(
        record.id,
        record.userId,
        record.job_id
      );

      return {
        id: ergonomicVideo.id,
        userId: ergonomicVideo.userId,
        job_id: ergonomicVideo.job_id,
      };
    } catch (error) {
      console.error("Failed to call ML endpoint:", error);
      throw new Error("Failed to analyze video with ML model");
    }
  }

  async getErgonomicVideoMoveNetResult(
    userId: string,
    job_id: string
  ): Promise<ErgonomicVideoMoveNet | null> {
    try {
      const { data } = await axios.get(
        `https://vps.danar.site/model2/predict/video/result?job_id=${job_id}`
      );

      if (data.status !== "done") {
        throw new Error("Video analysis is not yet complete");
      }

      const resultData = {
        userId: userId,
        job_id: job_id,
        avg_component_scores_lower_arm:
          data.result.avg_component_scores.lower_arm,
        avg_component_scores_neck: data.result.avg_component_scores.neck,
        avg_component_scores_trunk: data.result.avg_component_scores.trunk,
        avg_component_scores_upper_arm:
          data.result.avg_component_scores.upper_arm,
        avg_reba_score: data.result.avg_reba_score,
        avg_risk_level: data.result.avg_risk_level,
        feedback: data.result.feedback,
        max_component_scores_lower_arm:
          data.result.max_component_scores.lower_arm,
        max_component_scores_neck: data.result.max_component_scores.neck,
        max_component_scores_trunk: data.result.max_component_scores.trunk,
        max_component_scores_upper_arm:
          data.result.max_component_scores.upper_arm,
        max_reba_score: data.result.max_reba_score,
        max_risk_level: data.result.max_risk_level,
        processed_frames: data.result.processed_frames,
        risk_distribution_high_risk_frames:
          data.result.risk_distribution.high_risk_frames,
        risk_distribution_low_risk_frames:
          data.result.risk_distribution.low_risk_frames,
        risk_distribution_medium_risk_frames:
          data.result.risk_distribution.medium_risk_frames,
        segment_end_frame: data.result.segment_info.end_frame,
        segment_end_time: data.result.segment_info.end_time,
        segment_index: data.result.segment_info.segment_index,
        segment_start_frame: data.result.segment_info.start_frame,
        segment_start_time: data.result.segment_info.start_time,
        video_duration_seconds: data.result.video_metadata.duration_seconds,
        video_filename: data.result.video_metadata.filename,
        video_fps: data.result.video_metadata.fps,
        video_segment_duration_minutes:
          data.result.video_metadata.segment_duration_minutes,
        video_segments_count: data.result.video_metadata.segments_count,
        video_total_frames: data.result.video_metadata.total_frames,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const [affectedRows, updatedRecords] =
        await ErgonomicVideoMoveNetModel.update(resultData, {
          where: { job_id: job_id },
          returning: true,
        });

      if (affectedRows === 0) {
        return null;
      }
      return updatedRecords[0];
    } catch (error) {
      console.error("Error fetching ergonomic video result:", error);
      throw new Error("Failed to fetch video analysis result");
    }
  }

  async getAllErgonomicsVideoMoveNetHistoryBySupervisorId(
    supervisorId: string
  ): Promise<any[]> {
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    const employeeMap = new Map(
      employees.map((e) => [e.userId, e.user?.name ?? "Unknown"])
    );
    const employeeIds = employees.map((e) => e.userId);

    const records = await ErgonomicVideoMoveNetModel.findAll({
      where: { userId: employeeIds },
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      job_id: r.job_id,
      avg_component_scores_lower_arm: r.avg_component_scores_lower_arm,
      avg_component_scores_neck: r.avg_component_scores_neck,
      avg_component_scores_trunk: r.avg_component_scores_trunk,
      avg_component_scores_upper_arm: r.avg_component_scores_upper_arm,
      avg_reba_score: r.avg_reba_score,
      avg_risk_level: r.avg_risk_level,
      feedback: r.feedback,
      max_component_scores_lower_arm: r.max_component_scores_lower_arm,
      max_component_scores_neck: r.max_component_scores_neck,
      max_component_scores_trunk: r.max_component_scores_trunk,
      max_component_scores_upper_arm: r.max_component_scores_upper_arm,
      max_reba_score: r.max_reba_score,
      max_risk_level: r.max_risk_level,
      processed_frames: r.processed_frames,
      risk_distribution_high_risk_frames: r.risk_distribution_high_risk_frames,
      risk_distribution_low_risk_frames: r.risk_distribution_low_risk_frames,
      risk_distribution_medium_risk_frames:
        r.risk_distribution_medium_risk_frames,
      segment_end_frame: r.segment_end_frame,
      segment_end_time: r.segment_end_time,
      segment_index: r.segment_index,
      segment_start_frame: r.segment_start_frame,
      segment_start_time: r.segment_start_time,
      video_duration_seconds: r.video_duration_seconds,
      video_filename: r.video_filename,
      video_fps: r.video_fps,
      video_segment_duration_minutes: r.video_segment_duration_minutes,
      video_segments_count: r.video_segments_count,
      video_total_frames: r.video_total_frames,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }

  async getErgonomicMoveNetVideoHistory(userId: string): Promise<any[]> {
    const records = await ErgonomicVideoMoveNetModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      // map here
      id: r.id,
      userId: r.userId,
      job_id: r.job_id,
      avg_component_scores_lower_arm: r.avg_component_scores_lower_arm,
      avg_component_scores_neck: r.avg_component_scores_neck,
      avg_component_scores_trunk: r.avg_component_scores_trunk,
      avg_component_scores_upper_arm: r.avg_component_scores_upper_arm,
      avg_reba_score: r.avg_reba_score,
      avg_risk_level: r.avg_risk_level,
      feedback: r.feedback,
      max_component_scores_lower_arm: r.max_component_scores_lower_arm,
      max_component_scores_neck: r.max_component_scores_neck,
      max_component_scores_trunk: r.max_component_scores_trunk,
      max_component_scores_upper_arm: r.max_component_scores_upper_arm,
      max_reba_score: r.max_reba_score,
      max_risk_level: r.max_risk_level,
      processed_frames: r.processed_frames,
      risk_distribution_high_risk_frames: r.risk_distribution_high_risk_frames,
      risk_distribution_low_risk_frames: r.risk_distribution_low_risk_frames,
      risk_distribution_medium_risk_frames:
        r.risk_distribution_medium_risk_frames,
      segment_end_frame: r.segment_end_frame,
      segment_end_time: r.segment_end_time,
      segment_index: r.segment_index,
      segment_start_frame: r.segment_start_frame,
      segment_start_time: r.segment_start_time,
      video_duration_seconds: r.video_duration_seconds,
      video_filename: r.video_filename,
      video_fps: r.video_fps,
      video_segment_duration_minutes: r.video_segment_duration_minutes,
      video_segments_count: r.video_segments_count,
      video_total_frames: r.video_total_frames,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }
}
