import { PrismaClient } from "../generated/prisma";
import { IStatusUser } from "../interfaces/StatusUser/IStatusUser";
import { IStatusUserRepository } from "../interfaces/StatusUser/IStatusUserRepository";

export class RepositoryStatusUserPrisma implements IStatusUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<IStatusUser[]> {
    try {
      return await this.prisma.statusUser.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching statusUsers.", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<IStatusUser | null> {
    try {
      return await this.prisma.statusUser.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Repository] - Error fetching statusUser.", error);
      throw error;
    }
  }
}
