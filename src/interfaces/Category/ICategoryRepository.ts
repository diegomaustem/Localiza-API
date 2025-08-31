import { ICategory } from "./ICategory";

export interface ICategoryRepository {
  findMany(): Promise<ICategory[]>;
  findOne(id: string): Promise<ICategory | null>;
}
