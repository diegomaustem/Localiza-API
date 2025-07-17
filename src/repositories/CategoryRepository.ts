import { ICategory } from "../interfaces/ICategory";
import prisma from "../lib/prisma";

class CategoryRepository {
  async findMany(): Promise<ICategory[]> {
    try {
      return await prisma.categories.findMany();
    } catch (error) {
      console.error("Error fetching categories.", error);
      throw error;
    }
  }

  async findOne(categoryId: string): Promise<ICategory | null> {
    try {
      return await prisma.categories.findUnique({
        where: { id: categoryId },
      });
    } catch (error) {
      console.error("Error fetching category.", error);
      throw error;
    }
  }

  async create(categoryData: ICategory): Promise<ICategory> {
    try {
      return await prisma.categories.create({
        data: categoryData,
      });
    } catch (error) {
      console.error("Error creating category.", error);
      throw error;
    }
  }
}

export const categoryRepository = new CategoryRepository();
