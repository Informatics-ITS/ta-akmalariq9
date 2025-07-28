import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { Employee } from "../../entities/Employee";

export class GetEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string): Promise<Partial<Employee>> {
    const employee = await this.employeeRepository.getEmployee(id);
    if (!employee) throw new Error("Employee not found");

    const { userId, name, email, companyName, divisionName, supervisorName } =
      employee;
    return { userId, name, email, companyName, divisionName, supervisorName };
  }
}
