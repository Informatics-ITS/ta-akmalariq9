import { Employee } from "../../../domain/entities/Employee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { EmployeeModel } from "../models/EmployeeModels";
import { UserModel } from "../models/UserModels";
import { CompanyModel } from "../models/CompanyModels";
import { DivisionModel } from "../models/DivisionModels";
import { SupervisorModel } from "../models/SupervisorModels";
import { v4 as uuidv4 } from "uuid";

export class EmployeeRepository implements IEmployeeRepository {
  async isEmailExists(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ where: { email } });
    return !!user;
  }

  async registerEmployee(employee: Employee): Promise<Employee> {
    console.log("Creating user with:", {
      name: employee.name,
      email: employee.email,
      password: employee.password,
      role: "employee",
      supervisorId: employee.supervisorId,
      companyId: employee.companyId,
      divisionId: employee.divisionId,
    });

    const user = await UserModel.create({
      id: uuidv4(),
      name: employee.name,
      email: employee.email,
      password: employee.password,
      role: "employee",
    });

    console.log("User created:", user);

    console.log("Creating employee with user ID:", user.id);
    const newEmployee = await EmployeeModel.create({
      id: uuidv4(),
      userId: user.id,
      supervisorId: employee.supervisorId,
      companyId: employee.companyId,
      divisionId: employee.divisionId,
    });

    const supervisor = await SupervisorModel.findOne({
      where: { id: employee.supervisorId },
      include: [{ model: UserModel, as: "user", attributes: ["name"] }],
    });

    const division = await DivisionModel.findOne({
      where: { id: employee.divisionId },
      attributes: ["name"],
    });

    return new Employee(
      newEmployee.id,
      user.id,
      newEmployee.supervisorId,
      newEmployee.companyId,
      newEmployee.divisionId,
      employee.name,
      employee.email,
      supervisor?.user?.name ?? "",
      division?.name ?? ""
    );
  }

  async updateEmployee(id: string, data: Employee): Promise<Employee> {
    const employee = await EmployeeModel.findByPk(id);
    if (!employee) throw new Error("Employee not found");

    const user = await UserModel.findByPk(employee.userId);
    if (!user) throw new Error("Associated user not found");

    await user.update({
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      password: data.password ?? user.password,
    });

    await employee.update({
      companyId: data.companyId,
      divisionId: data.divisionId,
      supervisorId: data.supervisorId,
    });

    const division = await DivisionModel.findByPk(employee.divisionId);
    const company = await CompanyModel.findByPk(employee.companyId);
    const supervisor = await SupervisorModel.findOne({
      where: { id: employee.supervisorId },
      include: [{ model: UserModel, as: "user", attributes: ["name"] }],
    });

    return new Employee(
      employee.id,
      user.id,
      employee.supervisorId,
      employee.companyId,
      employee.divisionId,
      user.name,
      user.email,
      undefined,
      company?.name ?? "",
      division?.name ?? "",
      supervisor?.user?.name ?? ""
    );
  }

  async deleteEmployee(id: string): Promise<void> {
    const employee = await EmployeeModel.findByPk(id);
    if (!employee) throw new Error("Employee not found");

    await UserModel.destroy({ where: { id: employee.userId } });
  }

  async getEmployee(id: string): Promise<Employee | null> {
    const employee = await EmployeeModel.findOne({
      where: { id },
      include: [
        { model: UserModel, as: "user" },
        { model: CompanyModel, as: "company", attributes: ["name"] },
        { model: DivisionModel, as: "division", attributes: ["name"] },
        {
          model: SupervisorModel,
          as: "supervisor",
          include: [{ model: UserModel, as: "user", attributes: ["name"] }],
        },
      ],
    });

    if (!employee || !employee.user) return null;

    return new Employee(
      employee.id,
      employee.userId,
      employee.supervisorId,
      employee.companyId,
      employee.divisionId,
      employee.user.name,
      employee.user.email,
      undefined,
      employee.company?.name ?? "",
      employee.division?.name ?? "",
      employee.supervisor?.user?.name ?? ""
    );
  }

  async getAllEmployee(): Promise<Employee[]> {
    const employees = await EmployeeModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: CompanyModel,
          as: "company",
          attributes: ["name"],
        },
        {
          model: DivisionModel,
          as: "division",
          attributes: ["name"],
        },
      ],
    });

    return employees.map(
      (emp) =>
        new Employee(
          emp.id,
          emp.userId,
          emp.supervisorId,
          emp.companyId,
          emp.divisionId,
          emp.user?.name,
          emp.user?.email,
          undefined,
          emp.company?.name,
          emp.division?.name
        )
    );
  }

  async getAllBySupervisorId(supervisorId: string): Promise<Employee[]> {
    const employees = await EmployeeModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: CompanyModel,
          as: "company",
          attributes: ["name"],
        },
        {
          model: DivisionModel,
          as: "division",
          attributes: ["name"],
        },
      ],
    });

    return employees.map(
      (emp) =>
        new Employee(
          emp.id,
          emp.userId,
          emp.supervisorId,
          emp.companyId,
          emp.divisionId,
          emp.user?.name,
          emp.user?.email,
          undefined,
          emp.company?.name,
          emp.division?.name
        )
    );
  }
  async getByUserId(userId: string): Promise<Employee | null> {
    const employee = await EmployeeModel.findOne({
      where: { userId },
      include: [
        { model: UserModel, as: "user" },
        { model: CompanyModel, as: "company", attributes: ["name"] },
        { model: DivisionModel, as: "division", attributes: ["name"] },
      ],
    });

    if (!employee || !employee.user) return null;

    return new Employee(
      employee.id,
      employee.userId,
      employee.supervisorId,
      employee.companyId,
      employee.divisionId,
      employee.company?.name,
      employee.division?.name
    );
  }
}
