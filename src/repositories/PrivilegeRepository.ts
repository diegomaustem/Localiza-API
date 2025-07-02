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
  async create(privilege: IPrivilege): Promise<IPrivilege> {
    try {
      return await prisma.privileges.create({
        data: privilege,
      });
    } catch (error) {
      console.error("Error fetching privileges.", error);
      throw error;
    }
  }
}

export const privilegeRepository = new PrivilegeRepository();
