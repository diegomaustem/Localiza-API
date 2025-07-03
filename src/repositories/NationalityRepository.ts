import { INationality } from "../interfaces/INationality";
import prisma from "../lib/prisma";

class NationalityRepository {
  async findMany(): Promise<INationality[]> {
    try {
      return await prisma.nationalities.findMany();
    } catch (error) {
      console.error("Error fetching nationalities.", error);
      throw error;
    }
  }

  async findOne(nationalityId: string): Promise<INationality | null> {
    try {
      return await prisma.nationalities.findUnique({
        where: { id: nationalityId },
      });
    } catch (error) {
      console.error("Error fetching nationality.", error);
      throw error;
    }
  }

  async create(nationality: INationality): Promise<INationality> {
    try {
      return await prisma.nationalities.create({
        data: nationality,
      });
    } catch (error) {
      console.error("Error fetching nationality.", error);
      throw error;
    }
  }

  async update(
    nationalityId: string,
    nationalityData: INationality
  ): Promise<INationality> {
    try {
      return await prisma.nationalities.update({
        where: { id: nationalityId },
        data: nationalityData,
      });
    } catch (error) {
      console.error("Error updating nationality.", error);
      throw error;
    }
  }
  async delete(nationalityId: string): Promise<INationality> {
    try {
      return await prisma.nationalities.delete({
        where: { id: nationalityId },
      });
    } catch (error) {
      console.error("Error deleting nationality.", error);
      throw error;
    }
  }
}

export const nationalityRepository = new NationalityRepository();
