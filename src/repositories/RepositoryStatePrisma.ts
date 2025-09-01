import { PrismaClient } from "../generated/prisma";
import { IState } from "../interfaces/State/IState";
import { IStateRepository } from "../interfaces/State/IStateRepository";

export class RepositoryStatePrisma implements IStateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<IState[]> {
    try {
      return await this.prisma.state.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching states.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<IState | null> {
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
