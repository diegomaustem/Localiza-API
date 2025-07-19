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
}

export const privilegeRepository = new PrivilegeRepository();
