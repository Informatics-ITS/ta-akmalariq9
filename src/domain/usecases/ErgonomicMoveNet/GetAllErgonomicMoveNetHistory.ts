import { IErgonomicsMoveNetRepository } from "../../repositories/IErgonomicMoveNetRepository";
import { EmployeeModel } from "../../../infrastructure/db/models/EmployeeModels";
import { UserModel } from "../../../infrastructure/db/models/UserModels";

export class GetAllErgonomicMoveNetHistoryUseCase {
  constructor(private repo: IErgonomicsMoveNetRepository) {}

  async execute(
    supervisorId: string,
    month?: string
  ): Promise<Record<string, any[]>> {
    // Fetch analyses data from repository
    const analyses =
      await this.repo.getAllErgonomicMoveNetHistoryBySupervisorId(supervisorId);

    // Fetch employees with user details
    const employees = await EmployeeModel.findAll({
      where: { supervisorId },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    // Format analysis with employee name
    const formatted = analyses.map((a) => {
      const employee = employees.find((e) => e.userId === a.userId);
      return {
        ...a,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
        name: employee?.user?.name || "Unknown",
      };
    });

    // If filtering by month
    if (month) {
      const filtered = formatted.filter((a) => {
        const itemMonth = (a.createdAt.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        return itemMonth === month;
      });
      return { results: filtered };
    }

    // Group by month name
    const grouped: Record<string, typeof formatted> = {};
    formatted.forEach((a) => {
      const monthKey = a.createdAt
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase();
      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(a);
    });

    // Sort by calendar month order
    const orderedMonths = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const sortedGrouped: Record<string, typeof formatted> = {};
    for (const m of orderedMonths) {
      if (grouped[m]) {
        sortedGrouped[m] = grouped[m];
      }
    }

    return sortedGrouped;
  }
}
