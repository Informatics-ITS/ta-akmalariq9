import { Supervisor } from "../../../domain/entities/Supervisor";
import { SupervisorModel } from "../models/SupervisorModels";
import { UserModel } from "../models/UserModels";
import { ISupervisorRepository } from "../../../domain/repositories/ISupervisorRepository";
import { v4 as uuidv4 } from "uuid";
import { CompanyModel } from "../models/CompanyModels";

export class SupervisorRepository implements ISupervisorRepository {
  async createSupervisor(supervisor: Supervisor): Promise<Supervisor> {
    try {
      const user = await UserModel.create({
        id: uuidv4(),
        name: supervisor.name,
        email: supervisor.email,
        password: supervisor.password,
        role: "supervisor",
      });

      const newSupervisor = await SupervisorModel.create({
        id: uuidv4(),
        userId: user.id,
        companyId: supervisor.companyId,
      });

      const company = await CompanyModel.findByPk(supervisor.companyId, {
        attributes: ["name"],
      });

      return new Supervisor(
        newSupervisor.id,
        user.id,
        newSupervisor.companyId,
        user.name,
        user.email,
        undefined,
        company?.name ?? ""
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ where: { email } });
    return !!user;
  }

  async updateSupervisor(
    id: string,
    data: Partial<Supervisor>
  ): Promise<Supervisor> {
    const supervisor = await SupervisorModel.findOne({ where: { id } });
    if (!supervisor) throw new Error("Supervisor not found");

    const user = await UserModel.findByPk(supervisor.userId);
    if (!user) throw new Error("Associated user not found");

    await user.update({
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      password: data.password ?? user.password,
    });

    if (data.companyId) {
      await supervisor.update({ companyId: data.companyId });
    }

    return new Supervisor(supervisor.id, user.id, supervisor.companyId);
  }

  async deleteSupervisor(id: string): Promise<void> {
    const supervisor = await SupervisorModel.findByPk(id);
    if (!supervisor) throw new Error("Supervisor not found");

    await UserModel.destroy({ where: { id: supervisor.userId } });
  }

  async getSupervisor(id: string): Promise<Supervisor | null> {
    const supervisor = await SupervisorModel.findOne({
      where: { id },
      include: [
        { model: UserModel, as: "user", attributes: ["name", "email"] },
        { model: CompanyModel, as: "company", attributes: ["name"] },
      ],
    });

    if (!supervisor || !supervisor.user) return null;

    return new Supervisor(
      supervisor.id,
      supervisor.userId,
      supervisor.companyId,
      supervisor.user.name,
      supervisor.user.email,
      undefined,
      supervisor.company?.name ?? ""
    );
  }

  async getAllSupervisors(): Promise<Supervisor[]> {
    const supervisors = await SupervisorModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: CompanyModel,
          as: "company",
          attributes: ["name"],
        },
      ],
    });

    return supervisors
      .filter((s) => s.user)
      .map(
        (s) =>
          new Supervisor(
            s.id,
            s.user!.id,
            s.companyId,
            s.user!.name,
            s.user!.email,
            s.company?.name
          )
      );
  }
}
