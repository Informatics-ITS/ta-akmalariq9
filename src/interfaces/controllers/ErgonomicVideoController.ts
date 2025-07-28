import sendResponse from "../../shared/utils/ResponseHelper";
import { Request, Response } from "express";
import { ErgonomicVideoRepository } from "../../infrastructure/db/repositories/ErgonomicVideoRepository";
import { UploadErgonomicVideoUseCase } from "../../domain/usecases/ErgonomicVideo/UploadErgonomicVideoUseCase";
import { GetAllErgonomicVideoHistoryUseCase } from "../../domain/usecases/ErgonomicVideo/GetAllErgonomicVideoUseCase";
import { GetErgonomicVideoUseCase } from "../../domain/usecases/ErgonomicVideo/GetErgonomicVideoUseCase";
import { GetErgonomicVideoHistoryUseCase } from "../../domain/usecases/ErgonomicVideo/GetErgonomicVideoHistoryUseCase";
import { EmployeeRepository } from "../../infrastructure/db/repositories/EmployeeRepository";

const repo = new ErgonomicVideoRepository();
const employeeRepository = new EmployeeRepository();

export class ErgonomicVideoController {
  static async uploadErgonomicVideo(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const video = req.file;

      if (!video) {
        return sendResponse(res, 400, "No file uploaded");
      }

      const uploadErgonomicVideoUseCase = new UploadErgonomicVideoUseCase(repo);
      const result = await uploadErgonomicVideoUseCase.execute(
        userId,
        video.path
      );

      return sendResponse(res, 200, "Ergonomic analysis completed", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to analyze");
    }
  }

  static async getErgonomicVideoResult(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const jobId = req.query.job_id as string;

      const getErgonomicVideoResult = new GetErgonomicVideoUseCase(repo);
      const result = await getErgonomicVideoResult.execute(userId, jobId);

      return sendResponse(res, 200, "Ergonomic history fetched", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getErgonomicVideoHistory(req: Request, res: Response) {
    try {
      const employeeId = req.params.id;

      const employee = await employeeRepository.getEmployee(employeeId);
      if (!employee || !employee.userId) {
        return sendResponse(
          res,
          404,
          "Employee or associated user not found",
          null
        );
      }

      const userId = employee.userId;
      const getErgonomicMoveVideoNetHistoryUseCase =
        new GetErgonomicVideoHistoryUseCase(repo);
      const result = await getErgonomicMoveVideoNetHistoryUseCase.execute(
        userId
      );

      return sendResponse(
        res,
        200,
        "Ergonomic OpenPose video history fetched",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getErgonomicVideoHistoryProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const getErgonomicMoveVideoNetHistoryUseCase =
        new GetErgonomicVideoHistoryUseCase(repo);
      const result = await getErgonomicMoveVideoNetHistoryUseCase.execute(
        userId
      );

      return sendResponse(
        res,
        200,
        "Ergonomic OpenPose video history fetched",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getAllErgonomicVideoHistory(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.positionId;
      const { month } = req.query as { month?: string };

      const getAllErgonomicVideoHistoryUseCase =
        new GetAllErgonomicVideoHistoryUseCase(repo);

      const result = await getAllErgonomicVideoHistoryUseCase.execute(
        supervisorId,
        month
      );
      return sendResponse(res, 200, "Success get employee analysis", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to get analysis by supervisor");
    }
  }
}
