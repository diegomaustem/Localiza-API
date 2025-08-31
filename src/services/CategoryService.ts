import HttpError from "../errors/HttpError";
import { ICategory } from "../interfaces/Category/ICategory";
import { ICategoryRepository } from "../interfaces/Category/ICategoryRepository";
import { ICategoryService } from "../interfaces/Category/ICategoryService";

export class CategoryService implements ICategoryService {
  constructor(private readonly repository: ICategoryRepository) {}

  async listCategories(): Promise<ICategory[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("[Service] - Failed to retrieve categories.", error);
      throw error;
    }
  }

  async listCategory(id: string): Promise<ICategory | null> {
    try {
      const category = await this.repository.findOne(id);
      if (!category) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Category not found in our records.",
          404
        );
      }
      return category;
    } catch (error) {
      console.error("[Service] - Failed to retrieve category.", error);
      throw error;
    }
  }
}
