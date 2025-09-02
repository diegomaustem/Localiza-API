import { PrismaClient } from "../generated/prisma";
import { ICity } from "../interfaces/City/ICity";
import { ICityRepository } from "../interfaces/City/ICityRepository";

export class RepositoryCityPrisma implements ICityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<ICity[]> {
    try {
      return await this.prisma.city.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching cities.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<ICity | null> {
    try {
      return await this.prisma.city.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching city.", error);
      throw error;
    }
  }

  async create(city: ICity): Promise<ICity> {
    try {
      return await this.prisma.city.create({
        data: city,
      });
    } catch (error) {
      console.error("[Repository] - Error creating city.", error);
      throw error;
    }
  }

  async update(id: string, city: ICity): Promise<ICity> {
    try {
      return await this.prisma.city.update({
        where: { id },
        data: city,
      });
    } catch (error) {
      console.error("[Repository] - Error updating city.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<ICity> {
    try {
      return await this.prisma.city.delete({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error deleting city.", error);
      throw error;
    }
  }
}
