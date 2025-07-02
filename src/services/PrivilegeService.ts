import { v4 as uuidv4 } from "uuid";
import { IPrivilege } from "../interfaces/IPrivilege";
import { privilegeRepository } from "../repositories/PrivilegeRepository";

class PrivilegeService {
  async getPrivileges(): Promise<IPrivilege[]> {
    try {
      return await privilegeRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve Privileges.", error);
      throw error;
    }
  }

  async getPrivilege(privilegeId: string): Promise<IPrivilege | null> {
    try {
      return await privilegeRepository.findOne(privilegeId);
    } catch (error) {
      console.error("Failed to retrieve privilege.", error);
      throw error;
    }
  }

  async createPrivigele(privilege: IPrivilege): Promise<IPrivilege> {
    const newPrivilege: IPrivilege = {
      ...privilege,
      id: uuidv4(),
    };

    try {
      return await privilegeRepository.create(newPrivilege);
    } catch (error) {
      console.error("Failed to create privilege.", error);
      throw error;
    }
  }
}
export const privilegeService = new PrivilegeService();
