import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { ErgonomicMoveNet } from "../../../domain/entities/ErgonomicMoveNet";
import { IErgonomicsMoveNetRepository } from "../../../domain/repositories/IErgonomicMoveNetRepository";
import { ErgonomicMoveNetModel } from "../models/ErgonomicMoveNetModels";
import { EmployeeModel } from "../models/EmployeeModels";

export class ErgonomicMoveNetRepository
  implements IErgonomicsMoveNetRepository
{
  async uploadErgonomicsMoveNet(
    userId: string,
    filePath: string
  ): Promise<ErgonomicMoveNet> {
    const form = new FormData();

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      throw new Error(`File ${filePath} not found`);
    }

    form.append("image", fs.createReadStream(filePath));

    try {
      const headers = form.getHeaders();
      const { data } = await axios.post(
        "https://vps.danar.site/model2/predict/image",
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

      const record = await ErgonomicMoveNetModel.create({
        userId: userId,
        angle_values_left_leg: result.angle_values.left_leg,
        angle_values_left_lower_arm: result.angle_values.left_lower_arm,
        angle_values_left_upper_arm: result.angle_values.left_upper_arm,
        angle_values_neck: result.angle_values.neck,
        angle_values_right_leg: result.angle_values.right_leg,
        angle_values_right_lower_arm: result.angle_values.right_lower_arm,
        angle_values_right_upper_arm: result.angle_values.right_upper_arm,
        angle_values_waist: result.angle_values.waist,
        component_scores_leg_score: result.component_scores.leg_score,
        component_scores_lower_arm_score:
          result.component_scores.lower_arm_score,
        component_scores_neck_score: result.component_scores.neck_score,
        component_scores_reba_score: result.component_scores.reba_score,
        component_scores_trunk_score: result.component_scores.trunk_score,
        component_scores_upper_arm_score:
          result.component_scores.upper_arm_score,
        feedback: result.feedback,
        reba_score: result.reba_score,
        risk_level: result.risk_level,
        visualization_path: result.link_image,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return new ErgonomicMoveNet(
        record.id,
        record.userId,
        record.angle_values_left_leg,
        record.angle_values_left_lower_arm,
        record.angle_values_left_upper_arm,
        record.angle_values_neck,
        record.angle_values_right_leg,
        record.angle_values_right_lower_arm,
        record.angle_values_right_upper_arm,
        record.angle_values_waist,
        record.component_scores_leg_score,
        record.component_scores_lower_arm_score,
        record.component_scores_neck_score,
        record.component_scores_reba_score,
        record.component_scores_trunk_score,
        record.component_scores_upper_arm_score,
        record.feedback,
        record.reba_score,
        record.risk_level,
        record.visualization_path,
        record.createdAt,
        record.updatedAt
      );
    } catch (error) {
      throw new Error(
        `Failed to analyze image with ML model. Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getErgonomicMoveNetHistory(userId: string): Promise<any[]> {
    const records = await ErgonomicMoveNetModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      angle_values_left_leg: r.angle_values_left_leg,
      angle_values_left_lower_arm: r.angle_values_left_lower_arm,
      angle_values_left_upper_arm: r.angle_values_left_upper_arm,
      angle_values_neck: r.angle_values_neck,
      angle_values_right_leg: r.angle_values_right_leg,
      angle_values_right_lower_arm: r.angle_values_right_lower_arm,
      angle_values_right_upper_arm: r.angle_values_right_upper_arm,
      angle_values_waist: r.angle_values_waist,
      component_scores_leg_score: r.component_scores_leg_score,
      component_scores_lower_arm_score: r.component_scores_lower_arm_score,
      component_scores_neck_score: r.component_scores_neck_score,
      component_scores_reba_score: r.component_scores_reba_score,
      component_scores_trunk_score: r.component_scores_trunk_score,
      component_scores_upper_arm_score: r.component_scores_upper_arm_score,
      feedback: r.feedback,
      reba_score: r.reba_score,
      risk_level: r.risk_level,
      visualization_path: r.visualization_path,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }

  async getAllErgonomicMoveNetHistoryBySupervisorId(
    supervisorId: string
  ): Promise<any[]> {
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [
        {
          association: "user", // assumes EmployeeModel.belongsTo(UserModel, { as: "user" })
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

    const records = await ErgonomicMoveNetModel.findAll({
      where: { userId: employeeIds },
      order: [["createdAt", "DESC"]],
    });

    return records.map((r) => ({
      id: r.id,
      userId: r.userId,
      name: employeeMap.get(r.userId),
      angle_values_left_leg: r.angle_values_left_leg,
      angle_values_left_lower_arm: r.angle_values_left_lower_arm,
      angle_values_left_upper_arm: r.angle_values_left_upper_arm,
      angle_values_neck: r.angle_values_neck,
      angle_values_right_leg: r.angle_values_right_leg,
      angle_values_right_lower_arm: r.angle_values_right_lower_arm,
      angle_values_right_upper_arm: r.angle_values_right_upper_arm,
      angle_values_waist: r.angle_values_waist,
      component_scores_leg_score: r.component_scores_leg_score,
      component_scores_lower_arm_score: r.component_scores_lower_arm_score,
      component_scores_neck_score: r.component_scores_neck_score,
      component_scores_reba_score: r.component_scores_reba_score,
      component_scores_trunk_score: r.component_scores_trunk_score,
      component_scores_upper_arm_score: r.component_scores_upper_arm_score,
      feedback: r.feedback,
      reba_score: r.reba_score,
      risk_level: r.risk_level,
      visualization_path: r.visualization_path,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    }));
  }
}
