import { ErgonomicModel } from "../models/ErgonomicModels";
import { Ergonomic } from "../../../domain/entities/Ergonomic";
import { EmployeeModel } from "../models/EmployeeModels";
import { IErgonomicAnalysisRepository } from "../../../domain/repositories/IErgonomicRepository";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { UserModel } from "../models/UserModels";

export class ErgonomicRepository implements IErgonomicAnalysisRepository {
  async uploadErgonomics(userId: string, filePath: string): Promise<Ergonomic> {
    const form = new FormData();

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      throw new Error(`File ${filePath} not found`);
    }

    form.append("image", fs.createReadStream(filePath));

    try {
      const headers = form.getHeaders();
      const { data } = await axios.post(
        "https://vps.danar.site/model1/predict/image",
        form,
        {
          headers,
        }
      );

      const result = data.result;
      if (!result) {
        console.error("Result missing in response:", data);
        throw new Error("Response did not contain 'result'");
      }

      const record = await ErgonomicModel.create({
        userId,
        fileUrl: result.gambar_path,
        flags_sudut_bahu: result.default_value_flags.sudut_bahu,
        flags_sudut_leher: result.default_value_flags.sudut_leher,
        flags_sudut_lutut: result.default_value_flags.sudut_lutut,
        flags_sudut_pergelangan: result.default_value_flags.sudut_pergelangan,
        flags_sudut_punggung: result.default_value_flags.sudut_punggung,
        flags_sudut_siku: result.default_value_flags.sudut_siku,
        details_adjust_arm_supported: result.details.adjust_arm_supported,
        details_adjust_legs_feet: result.details.adjust_legs_feet,
        details_adjust_neck_twist: result.details.adjust_neck_twist,
        details_adjust_shoulder_raised: result.details.adjust_shoulder_raised,
        details_adjust_trunk_twist: result.details.adjust_trunk_twist,
        details_adjust_wrist_twist: result.details.adjust_wrist_twist,
        details_sudut_bahu: result.details.sudut_bahu,
        details_sudut_leher: result.details.sudut_leher,
        details_sudut_lutut: result.details.sudut_lutut,
        details_sudut_pergelangan: result.details.sudut_pergelangan,
        details_sudut_punggung: result.details.sudut_punggung,
        details_sudut_siku: result.details.sudut_siku,
        reba_final_score: result.reba_final_score,
        reba_leg_score: result.reba_leg_score,
        reba_lower_arm_score: result.reba_lower_arm_score,
        reba_neck_score: result.reba_neck_score,
        reba_trunk_score: result.reba_trunk_score,
        reba_upper_arm_score: result.reba_upper_arm_score,
        reba_wrist_score: result.reba_wrist_score,
        rula_final_score: result.rula_final_score,
        rula_leg_score: result.rula_leg_score,
        rula_lower_arm_score: result.rula_lower_arm_score,
        rula_neck_score: result.rula_neck_score,
        rula_trunk_score: result.rula_trunk_score,
        rula_upper_arm_score: result.rula_upper_arm_score,
        rula_wrist_score: result.rula_wrist_score,
        reba_summary: result.summary.reba_summary,
        rula_summary: result.summary.rula_summary,
        feedback: result.feedback,
      });

      return new Ergonomic(
        record.id,
        record.userId,
        record.flags_sudut_bahu,
        record.flags_sudut_leher,
        record.flags_sudut_lutut,
        record.flags_sudut_pergelangan,
        record.flags_sudut_punggung,
        record.flags_sudut_siku,
        record.details_adjust_arm_supported,
        record.details_adjust_legs_feet,
        record.details_adjust_neck_twist,
        record.details_adjust_shoulder_raised,
        record.details_adjust_trunk_twist,
        record.details_adjust_wrist_twist,
        record.details_sudut_bahu,
        record.details_sudut_leher,
        record.details_sudut_lutut,
        record.details_sudut_pergelangan,
        record.details_sudut_punggung,
        record.details_sudut_siku,
        record.feedback,
        record.fileUrl,
        record.reba_final_score,
        record.reba_leg_score,
        record.reba_lower_arm_score,
        record.reba_neck_score,
        record.reba_trunk_score,
        record.reba_upper_arm_score,
        record.reba_wrist_score,
        record.rula_final_score,
        record.rula_leg_score,
        record.rula_lower_arm_score,
        record.rula_neck_score,
        record.rula_trunk_score,
        record.rula_upper_arm_score,
        record.rula_wrist_score,
        record.reba_summary,
        record.rula_summary,
        new Date(record.createdAt),
        new Date(record.updatedAt)
      );
    } catch (error) {
      throw new Error(
        `Failed to analyze image with ML model. Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getAllErgonomicsHistoryBySupervisorId(
    supervisorId: string
  ): Promise<any[]> {
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [{ model: UserModel, as: "user", attributes: ["name"] }],
    });

    const employeeMap = new Map<string, string>();
    for (const e of employees) {
      if (e.user) {
        employeeMap.set(e.userId, e.user.name);
      }
    }

    const employeeIds = employees.map((e) => e.userId);
    const records = await ErgonomicModel.findAll({
      where: { userId: employeeIds },
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      name: employeeMap.get(r.userId),
      fileUrl: r.fileUrl,
      flags_sudut_bahu: r.flags_sudut_bahu,
      flags_sudut_leher: r.flags_sudut_leher,
      flags_sudut_lutut: r.flags_sudut_lutut,
      flags_sudut_pergelangan: r.flags_sudut_pergelangan,
      flags_sudut_punggung: r.flags_sudut_punggung,
      flags_sudut_siku: r.flags_sudut_siku,
      details_adjust_arm_supported: r.details_adjust_arm_supported,
      details_adjust_legs_feet: r.details_adjust_legs_feet,
      details_adjust_neck_twist: r.details_adjust_neck_twist,
      details_adjust_shoulder_raised: r.details_adjust_shoulder_raised,
      details_adjust_trunk_twist: r.details_adjust_trunk_twist,
      details_adjust_wrist_twist: r.details_adjust_wrist_twist,
      details_sudut_bahu: r.details_sudut_bahu,
      details_sudut_leher: r.details_sudut_leher,
      details_sudut_lutut: r.details_sudut_lutut,
      details_sudut_pergelangan: r.details_sudut_pergelangan,
      details_sudut_punggung: r.details_sudut_punggung,
      details_sudut_siku: r.details_sudut_siku,
      reba_final_score: r.reba_final_score,
      reba_leg_score: r.reba_leg_score,
      reba_lower_arm_score: r.reba_lower_arm_score,
      reba_neck_score: r.reba_neck_score,
      reba_trunk_score: r.reba_trunk_score,
      reba_upper_arm_score: r.reba_upper_arm_score,
      reba_wrist_score: r.reba_wrist_score,
      rula_final_score: r.rula_final_score,
      rula_leg_score: r.rula_leg_score,
      rula_lower_arm_score: r.rula_lower_arm_score,
      rula_neck_score: r.rula_neck_score,
      rula_trunk_score: r.rula_trunk_score,
      rula_upper_arm_score: r.rula_upper_arm_score,
      rula_wrist_score: r.rula_wrist_score,
      reba_summary: r.reba_summary,
      rula_summary: r.rula_summary,
      feedback: r.feedback,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }

  async getErgonomicsHistory(userId: string): Promise<any[]> {
    const records = await ErgonomicModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return records.map((result) => ({
      fileUrl: result.fileUrl,
      flags_sudut_bahu: result.flags_sudut_bahu,
      flags_sudut_leher: result.flags_sudut_leher,
      flags_sudut_lutut: result.flags_sudut_lutut,
      flags_sudut_pergelangan: result.flags_sudut_pergelangan,
      flags_sudut_punggung: result.flags_sudut_punggung,
      flags_sudut_siku: result.flags_sudut_siku,
      details_adjust_arm_supported: result.details_adjust_arm_supported,
      details_adjust_legs_feet: result.details_adjust_legs_feet,
      details_adjust_neck_twist: result.details_adjust_neck_twist,
      details_adjust_shoulder_raised: result.details_adjust_shoulder_raised,
      details_adjust_trunk_twist: result.details_adjust_trunk_twist,
      details_adjust_wrist_twist: result.details_adjust_wrist_twist,
      details_sudut_bahu: result.details_sudut_bahu,
      details_sudut_leher: result.details_sudut_leher,
      details_sudut_lutut: result.details_sudut_lutut,
      details_sudut_pergelangan: result.details_sudut_pergelangan,
      details_sudut_punggung: result.details_sudut_punggung,
      details_sudut_siku: result.details_sudut_siku,
      reba_final_score: result.reba_final_score,
      reba_leg_score: result.reba_leg_score,
      reba_lower_arm_score: result.reba_lower_arm_score,
      reba_neck_score: result.reba_neck_score,
      reba_trunk_score: result.reba_trunk_score,
      reba_upper_arm_score: result.reba_upper_arm_score,
      reba_wrist_score: result.reba_wrist_score,
      rula_final_score: result.rula_final_score,
      rula_leg_score: result.rula_leg_score,
      rula_lower_arm_score: result.rula_lower_arm_score,
      rula_neck_score: result.rula_neck_score,
      rula_trunk_score: result.rula_trunk_score,
      rula_upper_arm_score: result.rula_upper_arm_score,
      rula_wrist_score: result.rula_wrist_score,
      reba_summary: result.reba_summary,
      rula_summary: result.rula_summary,
      feedback: result.feedback,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }
}
