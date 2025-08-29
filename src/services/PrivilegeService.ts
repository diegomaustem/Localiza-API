import { IPrivilege } from "../interfaces/Privilege/IPrivilege";
import { IPrivilegeRepository } from "../interfaces/Privilege/IPrivilegeRepository";

export class ServicePrivilege {
  constructor(private repository: IPrivilegeRepository) {}

  async listPrivileges(): Promise<IPrivilege[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("Error retrieving privileges:", error);
      throw error;
    }
  }

  async listPrivilege(id: string): Promise<IPrivilege | null> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      console.error("Error retrieving privilege by ID:", error);
      throw error;
    }
  }
}
