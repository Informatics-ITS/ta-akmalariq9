import sendResponse from "../../shared/utils/ResponseHelper";
import { Request, Response } from "express";
import { UploadErgonomicVideMoveNetUseCase } from "../../domain/usecases/ErgonomicVideoMoveNet/UploadErgonomicVideoMoveNetUseCase";
import { GetErgonomicVideoMoveNetUseCase } from "../../domain/usecases/ErgonomicVideoMoveNet/GetErgonomicVideoMoveNetUseCase";
import { ErgonomicVideoMoveNetRepository } from "../../infrastructure/db/repositories/ErgonomicVideoMoveNetRepository";
import { GetAllErgonomicVideoMoveNetHistoryUseCase } from "../../domain/usecases/ErgonomicMoveNet/GetAllErgonomicVideoMoveNetHistoryUseCase";
import { GetErgonomicVideoMoveNetHistoryUseCase } from "../../domain/usecases/ErgonomicVideoMoveNet/GetErgonomicVideoMoveNetHistoryUseCase";
import { DownloadEmployeeErgonomicVideoMovenetPDFUseCase } from "../../domain/usecases/ErgonomicVideoMoveNet/DownloadErgonomicVideoMoveNetHistoryUseCase";
import { EmployeeRepository } from "../../infrastructure/db/repositories/EmployeeRepository";

const repo = new ErgonomicVideoMoveNetRepository();
const employeeRepository = new EmployeeRepository();

export class ErgonomicVideoMoveNetController {
  static async uploadErgonomicVideoMoveNet(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const video = req.file;

      if (!video) {
        return sendResponse(res, 400, "No file uploaded");
      }

      const uploadErgonomicVideoUseCase = new UploadErgonomicVideMoveNetUseCase(
        repo
      );
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

  static async getErgonomicVideoMoveNetResult(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const jobId = req.query.job_id as string;

      const getErgonomicVideoResult = new GetErgonomicVideoMoveNetUseCase(repo);
      const result = await getErgonomicVideoResult.execute(userId, jobId);

      return sendResponse(res, 200, "Ergonomic history fetched", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getErgonomicVideoMoveNetHistory(req: Request, res: Response) {
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
        new GetErgonomicVideoMoveNetHistoryUseCase(repo);
      const result = await getErgonomicMoveVideoNetHistoryUseCase.execute(
        userId
      );

      return sendResponse(
        res,
        200,
        "Ergonomic Movenet history fetched",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getErgonomicVideoMoveNetHistoryProfile(
    req: Request,
    res: Response
  ) {
    try {
      const userId = res.locals.userId;
      const getErgonomicMoveVideoNetHistoryUseCase =
        new GetErgonomicVideoMoveNetHistoryUseCase(repo);
      const result = await getErgonomicMoveVideoNetHistoryUseCase.execute(
        userId
      );

      return sendResponse(
        res,
        200,
        "Ergonomic Movenet history fetched",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getAllErgonomicVideoMoveNetHistoryBySupervisor(
    req: Request,
    res: Response
  ) {
    try {
      const supervisorId = res.locals.positionId;
      const { month } = req.query as { month?: string };

      const getAllErgonomicVideoMoveNetUseCase =
        new GetAllErgonomicVideoMoveNetHistoryUseCase(repo);
      const result = await getAllErgonomicVideoMoveNetUseCase.execute(
        supervisorId,
        month
      );

      return sendResponse(res, 200, "Success get employee analysis", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to get analysis by supervisor");
    }
  }

  static async downloadErgonomicVideoMoveNetDataPDF(
    req: Request,
    res: Response
  ) {
    try {
      const supervisorId = res.locals.userId;
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

      const useCase = new DownloadEmployeeErgonomicVideoMovenetPDFUseCase(repo);
      const pdfBuffer = await useCase.execute(userId, supervisorId);

      const filename = `ergonomic-data-${userId}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(pdfBuffer);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";
      console.error("Error downloading ergonomic Video Movenet PDF:", error);
      sendResponse(res, 500, message);
    }
  }
}
