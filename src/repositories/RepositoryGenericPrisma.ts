import { PrismaClient } from "../generated/prisma";
import { IGenericRepository } from "../interfaces/Generic/IGenericRepository";
import { ValidPrismaTable } from "../types/PrismaTables";

export class RepositoryGenericPrisma implements IGenericRepository {
  constructor(private prisma: PrismaClient) {}

  async genericQuery(
    table: ValidPrismaTable,
    field: string,
    value: string,
    id?: string
  ): Promise<Boolean> {
    try {
      const model = (this.prisma as any)[table];

      const where = id
        ? { AND: [{ [field]: value }, { id: { not: id } }] }
        : {
            [field]:
              typeof value === "string"
                ? { equals: value, mode: "insensitive" }
                : value,
          };

      const findRecord = await model.findFirst({ where });
      return !!findRecord;
    } catch (error) {
      console.error("[Repository] - Error executing generic query.", error);
      throw error;
    }
  }
}
