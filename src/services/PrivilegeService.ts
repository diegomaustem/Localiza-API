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

  async createPrivigele(privilegeData: IPrivilege): Promise<IPrivilege> {
    try {
      return await privilegeRepository.create(privilegeData);
    } catch (error) {
      console.error("Failed to create privilege.", error);
      throw error;
    }
  }

  async updatePrivilege(
    privilegeId: string,
    privilegeData: IPrivilege
  ): Promise<IPrivilege> {
    try {
      return await privilegeRepository.update(privilegeId, privilegeData);
    } catch (error) {
      console.error("Failed to update privilege.", error);
      throw error;
    }
  }

  async deletePrivilege(privilegeId: string): Promise<IPrivilege> {
    try {
      return await privilegeRepository.delete(privilegeId);
    } catch (error) {
      console.error("Failed to delete privilege.", error);
      throw error;
    }
  }

  async verifyPrivilege(privilegeData: IPrivilege): Promise<boolean> {
    const table: ValidPrismaTable = "privileges";
    const field = "name";
    const value = privilegeData.name;

    return genericRepository.generateQuery(table, field, value);
  }

  async verifyUserPrivilege(privilegeId: string): Promise<boolean> {
    const table: ValidPrismaTable = "users";
    const field = "privileges_id";
    const value = privilegeId;

    return genericRepository.generateQuery(table, field, value);
  }
}

export const privilegeService = new PrivilegeService();
