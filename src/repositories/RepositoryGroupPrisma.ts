import { PrismaClient } from "../generated/prisma";
import { IGroup } from "../interfaces/Group/IGroup";
import { IGroupRepository } from "../interfaces/Group/IGroupRepository";

export class RepositoryGroupPrisma implements IGroupRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<IGroup[]> {
    try {
      return await this.prisma.group.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching groups.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<IGroup | null> {
    try {
      return await this.prisma.group.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching group.", error);
      throw error;
    }
  }
}
