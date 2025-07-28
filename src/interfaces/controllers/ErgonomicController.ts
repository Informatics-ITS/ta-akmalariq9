import sendResponse from "../../shared/utils/ResponseHelper";
import { Request, Response } from "express";
import { ErgonomicRepository } from "../../infrastructure/db/repositories/ErgonomicRepository";
import { EmployeeRepository } from "../../infrastructure/db/repositories/EmployeeRepository";
import { GetErgonomicHistoryUseCase } from "../../domain/usecases/Ergonomic/GetErgonomicHistoryUseCase";
import { UploadErgonomicAnalysisUseCase } from "../../domain/usecases/Ergonomic/UploadErgonomicUseCase";
import { DownloadEmployeeErgonomicPDFUseCase } from "../../domain/usecases/Ergonomic/DownloadErgonomicUseCase";
import { GetErgonomicAnalysisBySupervisorUseCase } from "../../domain/usecases/Ergonomic/GetErgonomicAnalysisBySupervisorUseCase";

const repo = new ErgonomicRepository();
const employeeRepository = new EmployeeRepository();

export class ErgonomicController {
  static async uploadErgonomic(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const image = req.file;

      if (!image) {
        return sendResponse(res, 400, "No file uploaded");
      }

      const uploadErgonomicUseCase = new UploadErgonomicAnalysisUseCase(repo);
      const result = await uploadErgonomicUseCase.execute(userId, image.path);

      return sendResponse(res, 201, "Ergonomic analysis completed", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to analyze");
    }
  }

  static async getErgonomicHistory(req: Request, res: Response) {
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

      const getErgonomicHistoryUseCase = new GetErgonomicHistoryUseCase(repo);
      const result = await getErgonomicHistoryUseCase.execute(userId);

      return sendResponse(res, 200, "Ergonomic history fetched", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getErgonomicHistoryProfile(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const getErgonomicHistoryUseCase = new GetErgonomicHistoryUseCase(repo);
      const result = await getErgonomicHistoryUseCase.execute(userId);

      return sendResponse(res, 200, "Ergonomic history fetched", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to fetch history");
    }
  }

  static async getAllErgonomicHistoryBySupervisor(req: Request, res: Response) {
    try {
      const supervisorId = res.locals.positionId;
      const { month } = req.query as { month?: string };

      const getAllErgonomicUseCase =
        new GetErgonomicAnalysisBySupervisorUseCase(repo);

      const result = await getAllErgonomicUseCase.execute(supervisorId, month);
      return sendResponse(res, 200, "Success get employee analysis", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Failed to get analysis by supervisor");
    }
  }

  static async downloadErgonomicDataPDF(req: Request, res: Response) {
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

      const useCase = new DownloadEmployeeErgonomicPDFUseCase(repo);
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
      console.error("Error downloading ergonomic Movenet PDF:", error);
      sendResponse(res, 500, message);
    }
  }
}
