import { IPrivilege } from "./IPrivilege";

export interface IPrivilegeService {
  listPrivileges(): Promise<IPrivilege[]>;
  listPrivilege(id: string): Promise<IPrivilege | null>;
}
