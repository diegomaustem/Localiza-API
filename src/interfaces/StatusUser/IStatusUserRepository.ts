import { IStatusUser } from "./IStatusUser";

export interface IStatusUserRepository {
  findMany(): Promise<IStatusUser[]>;
  findOne(id: string): Promise<IStatusUser | null>;
}
