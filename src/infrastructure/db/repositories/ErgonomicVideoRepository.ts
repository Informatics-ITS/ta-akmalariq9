import { ErgonomicVideo } from "../../../domain/entities/ErgonomicVideo";
import { ErgonomicVideoModel } from "../models/ErgonomicVideoModels";
import { IErgonomicVideoRepository } from "../../../domain/repositories/IErgonomicVideoRepository";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { EmployeeModel } from "../models/EmployeeModels";

export class ErgonomicVideoRepository implements IErgonomicVideoRepository {
  async uploadErgonomicsVideo(
    userId: string,
    filePath: string
  ): Promise<{ id: string; userId: string; job_id: string }> {
    const form = new FormData();
    form.append("video", fs.createReadStream(filePath));

    try {
      const { data } = await axios.post(
        "https://vps.danar.site/model1/predict/video",
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

      const record = await ErgonomicVideoModel.create({
        userId: result.userId,
        job_id: result.job_id,
      });

      const ergonomicVideo = new ErgonomicVideo(
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

  async getErgonomicVideoResult(
    userId: string,
    job_id: string
  ): Promise<ErgonomicVideo | null> {
    try {
      const { data } = await axios.get(
        `https://vps.danar.site/model1/predict/video/result?job_id=${job_id}`
      );

      if (data.status !== "done") {
        throw new Error("Video analysis is not yet complete");
      }

      const resultData = {
        userId: userId,
        job_id: job_id,
        created_at: data.created_at,
        expire_at: data.expire_at,
        finished_at: data.finished_at,
        average_score_reba_final_score:
          data.result.average_scores.reba_final_score,
        average_score_leg_score: data.result.average_scores.reba_leg_score,
        average_score_lower_arm_score:
          data.result.average_scores.reba_lower_arm_score,
        average_score_neck_score: data.result.average_scores.reba_neck_score,
        average_score_trunk_score: data.result.average_scores.reba_trunk_score,
        average_score_upper_arm_score:
          data.result.average_scores.reba_upper_arm_score,
        average_score_wrist_score: data.result.average_scores.reba_wrist_score,
        average_score_rula_final_score:
          data.result.average_scores.rula_final_score,
        average_score_rula_leg_score: data.result.average_scores.rula_leg_score,
        average_score_rula_lower_arm_score:
          data.result.average_scores.rula_lower_arm_score,
        average_score_rula_neck_score:
          data.result.average_scores.rula_neck_score,
        average_score_rula_trunk_score:
          data.result.average_scores.rula_trunk_score,
        average_score_rula_upper_arm_score:
          data.result.average_scores.rula_upper_arm_score,
        average_score_rula_wrist_score:
          data.result.average_scores.rula_wrist_score,

        average_sudut_sudut_bahu: data.result.average_sudut.sudut_bahu,
        average_sudut_sudut_leher: data.result.average_sudut.sudut_leher,
        average_sudut_sudut_lutut: data.result.average_sudut.sudut_lutut,
        average_sudut_sudut_pergelangan:
          data.result.average_sudut.sudut_pergelangan,
        average_sudut_sudut_punggung: data.result.average_sudut.sudut_punggung,
        average_sudut_sudut_siku: data.result.average_sudut.sudut_siku,

        majority_score_reba_final_score:
          data.result.majority_scores.reba_final_score,
        majority_score_reba_leg_score:
          data.result.majority_scores.reba_leg_score,
        majority_score_reba_lower_arm_score:
          data.result.majority_scores.reba_lower_arm_score,
        majority_score_reba_neck_score:
          data.result.majority_scores.reba_neck_score,
        majority_score_reba_trunk_score:
          data.result.majority_scores.reba_trunk_score,
        majority_score_reba_upper_arm_score:
          data.result.majority_scores.reba_upper_arm_score,
        majority_score_reba_wrist_score:
          data.result.majority_scores.reba_wrist_score,
        majority_score_rula_final_score:
          data.result.majority_scores.rula_final_score,
        majority_score_rula_leg_score:
          data.result.majority_scores.rula_leg_score,
        majority_score_rula_lower_arm_score:
          data.result.majority_scores.rula_lower_arm_score,
        majority_score_rula_neck_score:
          data.result.majority_scores.rula_neck_score,
        majority_score_rula_trunk_score:
          data.result.majority_scores.rula_trunk_score,
        majority_score_rula_upper_arm_score:
          data.result.majority_scores.rula_upper_arm_score,
        majority_score_rula_wrist_score:
          data.result.majority_scores.rula_wrist_score,

        max_scores_reba_final_score: data.result.max_scores.reba_final_score,
        max_scores_reba_leg_score: data.result.max_scores.reba_leg_score,
        max_scores_reba_lower_arm_score:
          data.result.max_scores.reba_lower_arm_score,
        max_scores_reba_neck_score: data.result.max_scores.reba_neck_score,
        max_scores_reba_trunk_score: data.result.max_scores.reba_trunk_score,
        max_scores_reba_upper_arm_score:
          data.result.max_scores.reba_upper_arm_score,
        max_scores_reba_wrist_score: data.result.max_scores.reba_wrist_score,
        max_scores_rula_final_score: data.result.max_scores.rula_final_score,
        max_scores_rula_leg_score: data.result.max_scores.rula_leg_score,
        max_scores_rula_lower_arm_score:
          data.result.max_scores.rula_lower_arm_score,
        max_scores_rula_neck_score: data.result.max_scores.rula_neck_score,
        max_scores_rula_trunk_score: data.result.max_scores.rula_trunk_score,
        max_scores_rula_upper_arm_score:
          data.result.max_scores.rula_upper_arm_score,
        max_scores_rula_wrist_score: data.result.max_scores.rula_wrist_score,

        min_scores_reba_final_score: data.result.min_scores.reba_final_score,
        min_scores_reba_leg_score: data.result.min_scores.reba_leg_score,
        min_scores_reba_lower_arm_score:
          data.result.min_scores.reba_lower_arm_score,
        min_scores_reba_neck_score: data.result.min_scores.reba_neck_score,
        min_scores_reba_trunk_score: data.result.min_scores.reba_trunk_score,
        min_scores_reba_upper_arm_score:
          data.result.min_scores.reba_upper_arm_score,
        min_scores_reba_wrist_score: data.result.min_scores.reba_wrist_score,
        min_scores_rula_final_score: data.result.min_scores.rula_final_score,
        min_scores_rula_leg_score: data.result.min_scores.rula_leg_score,
        min_scores_rula_lower_arm_score:
          data.result.min_scores.rula_lower_arm_score,
        min_scores_rula_neck_score: data.result.min_scores.rula_neck_score,
        min_scores_rula_trunk_score: data.result.min_scores.rula_trunk_score,
        min_scores_rula_upper_arm_score:
          data.result.min_scores.rula_upper_arm_score,
        min_scores_rula_wrist_score: data.result.min_scores.rula_wrist_score,

        most_common_feedback: data.result.most_common_feedback,
        reba_summary: data.result.reba_summary,
        representative_image: data.result.representative_image,
        rula_summary: data.result.rula_summary,
        summary: data.result.summary,
        total_frames: data.result.total_frames,
        status: data.status,
      };
      const [affectedRows, updatedRecords] = await ErgonomicVideoModel.update(
        resultData,
        {
          where: { job_id: job_id },
          returning: true,
        }
      );

      if (affectedRows === 0) {
        return null;
      }
      return updatedRecords[0];
    } catch (error) {
      console.error("Error fetching ergonomic video result:", error);
      throw new Error("Failed to fetch video analysis result");
    }
  }

  async getAllErgonomicsVideoHistoryBySupervisorId(
    supervisorId: string
  ): Promise<any[]> {
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [
        {
          association: "user", // assuming EmployeeModel.belongsTo(UserModel, { as: 'user' })
          attributes: ["name"],
        },
      ],
    });

    const employeeMap = new Map<string, string>();
    const employeeIds: string[] = [];

    employees.forEach((e) => {
      employeeMap.set(e.userId, e.user?.name || "Unknown");
      employeeIds.push(e.userId);
    });

    const records = await ErgonomicVideoModel.findAll({
      where: { userId: employeeIds },
      order: [["createdAt", "DESC"]],
    });
    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      name: employeeMap.get(r.userId),
      job_id: r.job_id,
      average_score_reba_final_score: r.average_score_reba_final_score,
      average_score_leg_score: r.average_score_leg_score,
      average_score_lower_arm_score: r.average_score_lower_arm_score,
      average_score_neck_score: r.average_score_neck_score,
      average_score_trunk_score: r.average_score_trunk_score,
      average_score_upper_arm_score: r.average_score_upper_arm_score,
      average_score_wrist_score: r.average_score_wrist_score,
      average_score_rula_final_score: r.average_score_rula_final_score,
      average_score_rula_leg_score: r.average_score_leg_score,
      average_score_rula_lower_arm_score: r.average_score_lower_arm_score,
      average_score_rula_neck_score: r.average_score_neck_score,
      average_score_rula_trunk_score: r.average_score_trunk_score,
      average_score_rula_upper_arm_score: r.average_score_upper_arm_score,
      average_score_rula_wrist_score: r.average_score_wrist_score,
      average_sudut_sudut_bahu: r.average_sudut_sudut_bahu,
      average_sudut_sudut_leher: r.average_sudut_sudut_leher,
      average_sudut_sudut_lutut: r.average_sudut_sudut_lutut,
      average_sudut_sudut_pergelangan: r.average_sudut_sudut_pergelangan,
      average_sudut_sudut_punggung: r.average_sudut_sudut_punggung,
      average_sudut_sudut_siku: r.average_sudut_sudut_siku,
      majority_score_reba_final_score: r.majority_score_reba_final_score,
      majority_score_reba_leg_score: r.majority_score_reba_leg_score,
      majority_score_reba_lower_arm_score:
        r.majority_score_reba_lower_arm_score,
      majority_score_reba_neck_score: r.majority_score_reba_neck_score,
      majority_score_reba_trunk_score: r.majority_score_reba_trunk_score,
      majority_score_reba_upper_arm_score:
        r.majority_score_reba_upper_arm_score,
      majority_score_reba_wrist_score: r.majority_score_reba_wrist_score,
      majority_score_rula_final_score: r.majority_score_rula_final_score,
      majority_score_rula_leg_score: r.majority_score_rula_leg_score,
      majority_score_rula_lower_arm_score:
        r.majority_score_rula_lower_arm_score,
      majority_score_rula_neck_score: r.majority_score_rula_neck_score,
      majority_score_rula_trunk_score: r.majority_score_rula_trunk_score,
      majority_score_rula_upper_arm_score:
        r.majority_score_rula_upper_arm_score,
      majority_score_rula_wrist_score: r.majority_score_rula_wrist_score,
      max_scores_reba_final_score: r.max_scores_reba_final_score,
      max_scores_reba_leg_score: r.max_scores_reba_leg_score,
      max_scores_reba_lower_arm_score: r.max_scores_reba_lower_arm_score,
      max_scores_reba_neck_score: r.max_scores_reba_neck_score,
      max_scores_reba_trunk_score: r.max_scores_reba_trunk_score,
      max_scores_reba_upper_arm_score: r.max_scores_reba_upper_arm_score,
      max_scores_reba_wrist_score: r.max_scores_reba_wrist_score,
      max_scores_rula_final_score: r.max_scores_rula_final_score,
      max_scores_rula_leg_score: r.max_scores_rula_leg_score,
      max_scores_rula_lower_arm_score: r.max_scores_rula_lower_arm_score,
      max_scores_rula_neck_score: r.max_scores_rula_neck_score,
      max_scores_rula_trunk_score: r.max_scores_rula_trunk_score,
      max_scores_rula_upper_arm_score: r.max_scores_rula_upper_arm_score,
      max_scores_rula_wrist_score: r.max_scores_rula_wrist_score,
      min_scores_reba_final_score: r.min_scores_reba_final_score,
      min_scores_reba_leg_score: r.min_scores_reba_leg_score,
      min_scores_reba_lower_arm_score: r.min_scores_reba_lower_arm_score,
      min_scores_reba_neck_score: r.min_scores_reba_neck_score,
      min_scores_reba_trunk_score: r.min_scores_reba_trunk_score,
      min_scores_reba_upper_arm_score: r.min_scores_reba_upper_arm_score,
      min_scores_reba_wrist_score: r.min_scores_reba_wrist_score,
      min_scores_rula_final_score: r.min_scores_rula_final_score,
      min_scores_rula_leg_score: r.min_scores_rula_leg_score,
      min_scores_rula_lower_arm_score: r.min_scores_rula_lower_arm_score,
      min_scores_rula_neck_score: r.min_scores_rula_neck_score,
      min_scores_rula_trunk_score: r.min_scores_rula_trunk_score,
      min_scores_rula_upper_arm_score: r.min_scores_rula_upper_arm_score,
      min_scores_rula_wrist_score: r.min_scores_rula_wrist_score,
      most_common_feedback: r.most_common_feedback,
      reba_summary: r.reba_summary,
      representative_image: r.representative_image,
      rula_summary: r.rula_summary,
      summary: r.summary,
      total_frames: r.total_frames,
      status: r.status,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }

  async getErgonomicVideoHistory(userId: string): Promise<any[]> {
    const records = await ErgonomicVideoModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      job_id: r.job_id,
      average_score_reba_final_score: r.average_score_reba_final_score,
      average_score_leg_score: r.average_score_leg_score,
      average_score_lower_arm_score: r.average_score_lower_arm_score,
      average_score_neck_score: r.average_score_neck_score,
      average_score_trunk_score: r.average_score_trunk_score,
      average_score_upper_arm_score: r.average_score_upper_arm_score,
      average_score_wrist_score: r.average_score_wrist_score,
      average_score_rula_final_score: r.average_score_rula_final_score,
      average_score_rula_leg_score: r.average_score_leg_score,
      average_score_rula_lower_arm_score: r.average_score_lower_arm_score,
      average_score_rula_neck_score: r.average_score_neck_score,
      average_score_rula_trunk_score: r.average_score_trunk_score,
      average_score_rula_upper_arm_score: r.average_score_upper_arm_score,
      average_score_rula_wrist_score: r.average_score_wrist_score,
      average_sudut_sudut_bahu: r.average_sudut_sudut_bahu,
      average_sudut_sudut_leher: r.average_sudut_sudut_leher,
      average_sudut_sudut_lutut: r.average_sudut_sudut_lutut,
      average_sudut_sudut_pergelangan: r.average_sudut_sudut_pergelangan,
      average_sudut_sudut_punggung: r.average_sudut_sudut_punggung,
      average_sudut_sudut_siku: r.average_sudut_sudut_siku,
      majority_score_reba_final_score: r.majority_score_reba_final_score,
      majority_score_reba_leg_score: r.majority_score_reba_leg_score,
      majority_score_reba_lower_arm_score:
        r.majority_score_reba_lower_arm_score,
      majority_score_reba_neck_score: r.majority_score_reba_neck_score,
      majority_score_reba_trunk_score: r.majority_score_reba_trunk_score,
      majority_score_reba_upper_arm_score:
        r.majority_score_reba_upper_arm_score,
      majority_score_reba_wrist_score: r.majority_score_reba_wrist_score,
      majority_score_rula_final_score: r.majority_score_rula_final_score,
      majority_score_rula_leg_score: r.majority_score_rula_leg_score,
      majority_score_rula_lower_arm_score:
        r.majority_score_rula_lower_arm_score,
      majority_score_rula_neck_score: r.majority_score_rula_neck_score,
      majority_score_rula_trunk_score: r.majority_score_rula_trunk_score,
      majority_score_rula_upper_arm_score:
        r.majority_score_rula_upper_arm_score,
      majority_score_rula_wrist_score: r.majority_score_rula_wrist_score,
      max_scores_reba_final_score: r.max_scores_reba_final_score,
      max_scores_reba_leg_score: r.max_scores_reba_leg_score,
      max_scores_reba_lower_arm_score: r.max_scores_reba_lower_arm_score,
      max_scores_reba_neck_score: r.max_scores_reba_neck_score,
      max_scores_reba_trunk_score: r.max_scores_reba_trunk_score,
      max_scores_reba_upper_arm_score: r.max_scores_reba_upper_arm_score,
      max_scores_reba_wrist_score: r.max_scores_reba_wrist_score,
      max_scores_rula_final_score: r.max_scores_rula_final_score,
      max_scores_rula_leg_score: r.max_scores_rula_leg_score,
      max_scores_rula_lower_arm_score: r.max_scores_rula_lower_arm_score,
      max_scores_rula_neck_score: r.max_scores_rula_neck_score,
      max_scores_rula_trunk_score: r.max_scores_rula_trunk_score,
      max_scores_rula_upper_arm_score: r.max_scores_rula_upper_arm_score,
      max_scores_rula_wrist_score: r.max_scores_rula_wrist_score,
      min_scores_reba_final_score: r.min_scores_reba_final_score,
      min_scores_reba_leg_score: r.min_scores_reba_leg_score,
      min_scores_reba_lower_arm_score: r.min_scores_reba_lower_arm_score,
      min_scores_reba_neck_score: r.min_scores_reba_neck_score,
      min_scores_reba_trunk_score: r.min_scores_reba_trunk_score,
      min_scores_reba_upper_arm_score: r.min_scores_reba_upper_arm_score,
      min_scores_reba_wrist_score: r.min_scores_reba_wrist_score,
      min_scores_rula_final_score: r.min_scores_rula_final_score,
      min_scores_rula_leg_score: r.min_scores_rula_leg_score,
      min_scores_rula_lower_arm_score: r.min_scores_rula_lower_arm_score,
      min_scores_rula_neck_score: r.min_scores_rula_neck_score,
      min_scores_rula_trunk_score: r.min_scores_rula_trunk_score,
      min_scores_rula_upper_arm_score: r.min_scores_rula_upper_arm_score,
      min_scores_rula_wrist_score: r.min_scores_rula_wrist_score,
      most_common_feedback: r.most_common_feedback,
      reba_summary: r.reba_summary,
      representative_image: r.representative_image,
      rula_summary: r.rula_summary,
      summary: r.summary,
      total_frames: r.total_frames,
      status: r.status,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }
}
