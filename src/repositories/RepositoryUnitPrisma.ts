import { PrismaClient } from "../generated/prisma";
import { IUnit } from "../interfaces/Unit/IUnit";
import { IUnitCreation } from "../interfaces/Unit/IUnitCreation";
import { IUnitRepository } from "../interfaces/Unit/IUnitRepository";
import { IUnitUpdate } from "../interfaces/Unit/IUnitUpdate";

export class RepositoryUnitPrisma implements IUnitRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<IUnit[]> {
    try {
      return await this.prisma.unit.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching units.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<IUnit | null> {
    try {
      return await this.prisma.unit.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching unit.", error);
      throw error;
    }
  }

  async create(unit: IUnitCreation): Promise<IUnit> {
    try {
      return await this.prisma.unit.create({
        data: unit,
      });
    } catch (error) {
      console.error("[Repository] - Error creating the unit.", error);
      throw error;
    }
  }

  async update(id: string, unitData: IUnitUpdate): Promise<IUnit> {
    try {
      return await this.prisma.unit.update({
        where: { id },
        data: unitData,
      });
    } catch (error) {
      console.error("[Repository] - Error updating unit.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<IUnit> {
    try {
      return await this.prisma.unit.delete({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error deleting unit.", error);
      throw error;
    }
  }
}
