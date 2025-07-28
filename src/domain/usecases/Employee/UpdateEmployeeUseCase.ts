import bcrypt from "bcrypt";
import { Employee } from "../../entities/Employee";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateEmployeeUseCase {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, data: Partial<Employee>): Promise<Employee> {
    const existing = await this.employeeRepository.getEmployee(id);
    if (!existing) throw new Error("Employee not found");

    const user = await this.userRepository.getPersonal(existing.userId);
    if (!user) throw new Error("Associated user not found");

    if (data.email && data.email !== user.email) {
      const isTaken = await this.userRepository.isEmailExists(data.email);
      if (isTaken) throw new Error("Email already in use");
    }

    const password = data.password
      ? await bcrypt.hash(data.password, 10)
      : user.password;

    await this.userRepository.updatePersonal(user.id, {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      password,
    });

    const updatedEmployee = await this.employeeRepository.updateEmployee(id, {
      ...existing,
      supervisorId: data.supervisorId ?? existing.supervisorId,
      companyId: data.companyId ?? existing.companyId,
      divisionId: data.divisionId ?? existing.divisionId,
    });

    return updatedEmployee;
  }
}
