import { PrismaClient } from "../generated/prisma";
import { ICategory } from "../interfaces/Category/ICategory";
import { ICategoryRepository } from "../interfaces/Category/ICategoryRepository";

export class RepositoryCategoryPrisma implements ICategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<ICategory[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching categories.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<ICategory | null> {
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
