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
      // const hasInTable = await model.findUnique({
      //   where: { [field]: value },
      // });

      const where = id
        ? { AND: [{ [field]: value }, { id: { not: id } }] }
        : { [field]: value };

      const hasInTable = await model.findFirst({ where });
      // console.log(hasInTable);
      return !!hasInTable;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const genericRepository = new GenericRepository();
