import { IUser } from "./IUser";
import { IUserCreation } from "./IUserCreation";
import { IUserUpdate } from "./IUserUpdate";

export interface IUserService {
  listUsers(): Promise<IUser[]>;
  listUser(id: string): Promise<IUser | null>;
  create(user: IUserCreation): Promise<IUser>;
  update(id: string, user: IUserUpdate): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
