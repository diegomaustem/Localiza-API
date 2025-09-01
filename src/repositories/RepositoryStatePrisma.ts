import { PrismaClient } from "../generated/prisma";
import { IState } from "../interfaces/State/IState";

export class RepositoryStatePrisma {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<IState[]> {
    try {
      return await this.prisma.state.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching states.", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<IState | null> {
    try {
      return await this.prisma.state.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching state.", error);
      throw error;
    }
  }
}
