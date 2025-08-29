import { IPrivilege } from "./IPrivilege";

export interface IPrivilegeRepository {
  findMany(): Promise<IPrivilege[]>;
  findOne(id: string): Promise<IPrivilege | null>;
}
