import { IPrivilege } from "../interfaces/Privilege/IPrivilege";
import { IPrivilegeRepository } from "../interfaces/Privilege/IPrivilegeRepository";
import { PrismaClient } from "../generated/prisma";

export class RepositoryPrivilegePrisma implements IPrivilegeRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<IPrivilege[]> {
    try {
      return await this.prisma.privilege.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching privileges.", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<IPrivilege | null> {
    try {
      return await this.prisma.privilege.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Repository] - Error fetching privilege.", error);
      throw error;
    }
  }
}
