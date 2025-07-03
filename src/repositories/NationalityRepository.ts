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
}

export const nationalityRepository = new NationalityRepository();
