import { IStatusUser } from "./IStatusUser";

export interface IStatusUserRepository {
  findMany(): Promise<IStatusUser[]>;
  findUnique(id: string): Promise<IStatusUser | null>;
}
