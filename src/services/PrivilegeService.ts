import { IPrivilege } from "../interfaces/IPrivilege";
import { genericRepository } from "../repositories/GenericRepository";
import { privilegeRepository } from "../repositories/PrivilegeRepository";
import { ValidPrismaTable } from "../types/PrismaTables";

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
