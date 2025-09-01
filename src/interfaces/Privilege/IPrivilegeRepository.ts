import { IPrivilege } from "./IPrivilege";

export interface IPrivilegeRepository {
  findMany(): Promise<IPrivilege[]>;
  findUnique(id: string): Promise<IPrivilege | null>;
}
