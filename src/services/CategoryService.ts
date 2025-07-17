import HttpError from "../errors/HttpError";
import { ICategory } from "../interfaces/ICategory";
import { categoryRepository } from "../repositories/CategoryRepository";
import { genericRepository } from "../repositories/GenericRepository";

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

  async createCategory(categoryData: ICategory): Promise<ICategory> {
    try {
      return await categoryRepository.create(categoryData);
    } catch (error) {
      console.error("Failed to create category.", error);
      throw error;
    }
  }

  async categoryRulesValidation(
    categoryData: ICategory,
    categoryId?: string
  ): Promise<void> {
    const hasCategory = await genericRepository.generateQuery(
      "categories",
      "name",
      categoryData.name
    );
    if (hasCategory) {
      throw new HttpError(
        "The category provided is already registered. Enter another name.",
        409
      );
    }
  }
}

export const categoryService = new CategoryService();
