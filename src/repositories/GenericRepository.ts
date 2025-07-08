import prisma from "../lib/prisma";
import { ValidPrismaTable } from "../types/PrismaTables";

class GenericRepository {
  async generateQuery(
    table: ValidPrismaTable,
    field: string,
    value: string
  ): Promise<boolean> {
    try {
      const model = (prisma as any)[table];
      const hasInTable = await model.findUnique({
        where: { [field]: value },
      });

      return !!hasInTable;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const genericRepository = new GenericRepository();
