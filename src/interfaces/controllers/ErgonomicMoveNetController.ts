import sendResponse from "../../shared/utils/ResponseHelper";
import { Request, Response } from "express";
import { ErgonomicMoveNetRepository } from "../../infrastructure/db/repositories/ErgonomicMoveNetRepository";
import { UploadErgonomicMoveNetUseCase } from "../../domain/usecases/ErgonomicMoveNet/UploadErgonomicMoveNetUseCase";
import { GetErgonomicMoveNetHistoryUseCase } from "../../domain/usecases/ErgonomicMoveNet/GetErgonomicMoveNetHistory";
import { GetAllErgonomicMoveNetHistoryUseCase } from "../../domain/usecases/ErgonomicMoveNet/GetAllErgonomicMoveNetHistory";
import { DownloadEmployeeErgonomicMovenetPDFUseCase } from "../../domain/usecases/ErgonomicMoveNet/DownloadErgonomicMoveNet";
import { EmployeeRepository } from "../../infrastructure/db/repositories/EmployeeRepository";

const repo = new ErgonomicMoveNetRepository();
const employeeRepository = new EmployeeRepository();

export class ErgonomicMoveNetController {
  static async uploadErgonomicMoveNet(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const image = req.file;

      if (!image) {
        return sendResponse(res, 400, "No file uploaded");
      }

      const uploadErgonomicUseCase = new UploadErgonomicMoveNetUseCase(repo);
      const result = await uploadErgonomicUseCase.execute(userId, image.path);

      return sendResponse(res, 201, "Ergonomic analysis completed", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to analyze");
    }
  }

  static async getErgonomicMoveNetHistory(req: Request, res: Response) {
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
      const getErgonomicMoveNetHistoryUseCase =
        new GetErgonomicMoveNetHistoryUseCase(repo);
      const result = await getErgonomicMoveNetHistoryUseCase.execute(userId);

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

  static async getErgonomicMoveNetHistoryProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const getErgonomicMoveNetHistoryUseCase =
        new GetErgonomicMoveNetHistoryUseCase(repo);
      const result = await getErgonomicMoveNetHistoryUseCase.execute(userId);

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

  static async getAllErgonomicHistoryBySupervisor(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.positionId;
      const { month } = req.query as { month?: string };

      const getAllErgonomicMoveNetHistoryUseCase =
        new GetAllErgonomicMoveNetHistoryUseCase(repo);
      const result = await getAllErgonomicMoveNetHistoryUseCase.execute(
        supervisorId,
        month
      );

      return sendResponse(res, 200, "Success get employee analysis", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to get analysis by supervisor");
    }
  }

  static async downloadErgonomicMovenetDataPDF(req: Request, res: Response) {
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

      const useCase = new DownloadEmployeeErgonomicMovenetPDFUseCase(repo);
      const pdfBuffer = await useCase.execute(userId, supervisorId);

      const filename = `ergonomic-movenet-data-${userId}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(pdfBuffer);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";
      console.error("Error downloading ergonomic Movenet PDF:", error);
      sendResponse(res, 500, message);
    }
  }
}


