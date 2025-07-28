// use case get employee by user ID
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { Employee } from "../../entities/Employee";
import { IResponse } from "../../../shared/utils/IResponse";
import {
  successResponse,
  errorResponse,
} from "../../../shared/utils/CreateResponse";

export class GetEmployeeByUserIdUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(userId: string): Promise<IResponse<Employee>> {
    if (!userId?.trim()) {
      return errorResponse("User ID is required");
    }

    const employee = await this.employeeRepository.getByUserId(userId);
    if (!employee) {
      return errorResponse("Employee not found", 404);
    }

    return successResponse("Employee retrieved successfully", employee, 200);
  }
}
