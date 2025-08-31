import { PrismaClient } from "../generated/prisma";
import { ICategory } from "../interfaces/Category/ICategory";

export class RepositoryCategoryPrisma {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<ICategory[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching categories.", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<ICategory | null> {
    try {
      return await this.prisma.category.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching category.", error);
      throw error;
    }
  }
}
