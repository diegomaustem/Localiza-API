import { ICategory } from "./ICategory";

export interface ICategoryRepository {
  findMany(): Promise<ICategory[]>;
  findUnique(id: string): Promise<ICategory | null>;
}
