import { PrismaClient } from "../generated/prisma";
import { INationality } from "../interfaces/Nationality/INationality";
import { INationalityRepository } from "../interfaces/Nationality/ICategoryRepository";

export class RepositoryNationalityPrisma implements INationalityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<INationality[]> {
    try {
      return await this.prisma.nationality.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching nationalities.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<INationality | null> {
    try {
      return await this.prisma.nationality.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching nationality.", error);
      throw error;
    }
  }

  async create(nationality: INationality): Promise<INationality> {
    try {
      return await this.prisma.nationality.create({
        data: nationality,
      });
    } catch (error) {
      console.error("[Repository] - Error fetching nationality.", error);
      throw error;
    }
  }

  async update(id: string, nationality: INationality): Promise<INationality> {
    try {
      return await this.prisma.nationality.update({
        where: { id },
        data: nationality,
      });
    } catch (error) {
      console.error("[Repository] - Error updating nationality.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<INationality> {
    try {
      return await this.prisma.nationality.delete({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error deleting nationality.", error);
      throw error;
    }
  }
}
