import { IPrivilege } from "../interfaces/IPrivilege";
import { privilegeRepository } from "../repositories/PrivilegeRepository";
class PrivilegeService {
  async getPrivileges(): Promise<IPrivilege[]> {
    try {
      return await privilegeRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve privileges.", error);
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
}

export const privilegeService = new PrivilegeService();
