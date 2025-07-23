import prisma from "../lib/prisma";
import { ValidPrismaTable } from "../types/PrismaTables";
class GenericRepository {
  async generateQuery(
    table: ValidPrismaTable,
    field: string,
    value: string,
    id?: string
  ): Promise<boolean> {
    try {
      const model = (prisma as any)[table];
      const where = id
        ? { AND: [{ [field]: value }, { id: { not: id } }] }
        : {
            [field]:
              typeof value === "string"
                ? { equals: value, mode: "insensitive" }
                : value,
          };

      const hasInTable = await model.findFirst({ where });
      return !!hasInTable;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
export const genericRepository = new GenericRepository();
