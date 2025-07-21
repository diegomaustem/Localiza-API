import { IUnit } from "../interfaces/IUnit";
import prisma from "../lib/prisma";

class UnitRepository {
  async findMany(): Promise<IUnit[]> {
    try {
      return await prisma.units.findMany();
    } catch (error) {
      console.error("Error fetching units.", error);
      throw error;
    }
  }

  async findOne(unitId: string): Promise<IUnit | null> {
    try {
      return await prisma.units.findUnique({
        where: { id: unitId },
      });
    } catch (error) {
      console.error("Error fetching unit.", error);
      throw error;
    }
  }

  async create(unit: IUnit): Promise<IUnit> {
    try {
      return await prisma.units.create({
        data: unit,
      });
    } catch (error) {
      console.error("Error fetching unit.", error);
      throw error;
    }
  }

  async update(unitId: string, unitData: IUnit): Promise<IUnit> {
    try {
      return await prisma.units.update({
        where: { id: unitId },
        data: unitData,
      });
    } catch (error) {
      console.error("Error updating unit.", error);
      throw error;
    }
  }

  async delete(unitId: string): Promise<IUnit> {
    try {
      return await prisma.units.delete({
        where: { id: unitId },
      });
    } catch (error) {
      console.error("Error deleting unit.", error);
      throw error;
    }
  }
}

export const unitRepository = new UnitRepository();
