import { ICategory } from "./ICategory";

export interface ICategoryService {
  listCategories(): Promise<ICategory[]>;
  listCategory(id: string): Promise<ICategory | null>;
}
