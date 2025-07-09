import { IPrivilege } from "../interfaces/IPrivilege";
import prisma from "../lib/prisma";

class PrivilegeRepository {
  async findMany(): Promise<IPrivilege[]> {
    try {
      return await prisma.privileges.findMany();
    } catch (error) {
      console.error("Error fetching privileges.", error);
      throw error;
    }
  }

  async findOne(privilegeId: string): Promise<IPrivilege | null> {
    try {
      return await prisma.privileges.findUnique({
        where: { id: privilegeId },
      });
    } catch (error) {
      console.error("Error fetching privilege.", error);
      throw error;
    }
  }

  async create(privilegeData: IPrivilege): Promise<IPrivilege> {
    try {
      return await prisma.privileges.create({
        data: privilegeData,
      });
    } catch (error) {
      console.error("Error fetching privileges.", error);
      throw error;
    }
  }

  async update(
    privilegeId: string,
    privilegeData: IPrivilege
  ): Promise<IPrivilege> {
    try {
      return await prisma.privileges.update({
        where: { id: privilegeId },
        data: privilegeData,
      });
    } catch (error) {
      console.error("Error updating privilege.", error);
      throw error;
    }
  }

  async delete(privilegeId: string): Promise<IPrivilege> {
    try {
      return await prisma.privileges.delete({
        where: { id: privilegeId },
      });
    } catch (error) {
      console.error("Error deleting privilege.", error);
      throw error;
    }
  }
}

export const privilegeRepository = new PrivilegeRepository();
