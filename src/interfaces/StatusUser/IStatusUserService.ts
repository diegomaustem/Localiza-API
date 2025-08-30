import { IStatusUser } from "./IStatusUser";

export interface IStatusUserService {
  listStatusUsers(): Promise<IStatusUser[]>;
  listStatusUser(id: string): Promise<IStatusUser | null>;
}
