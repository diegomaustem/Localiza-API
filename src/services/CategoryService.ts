import { ICategory } from "../interfaces/ICategory";
import { categoryRepository } from "../repositories/CategoryRepository";
class CategoryService {
  async getCategories(): Promise<ICategory[]> {
    try {
      return await categoryRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve categories.", error);
      throw error;
    }
  }

  async getCategory(categoryId: string): Promise<ICategory | null> {
    try {
      return await categoryRepository.findOne(categoryId);
    } catch (error) {
      console.error("Failed to retrieve category.", error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
