import { IHonor } from "../interfaces/IHonor";
import prisma from "../lib/prisma";

class HonorRepository {
  async findMany(): Promise<IHonor[]> {
    try {
      return await prisma.honors.findMany();
    } catch (error) {
      console.error("Error fetching honors.", error);
      throw error;
    }
  }

  async findOne(honorId: string): Promise<IHonor | null> {
    try {
      return await prisma.honors.findUnique({
        where: { id: honorId },
      });
    } catch (error) {
      console.error("Error fetching honor.", error);
      throw error;
    }
  }

  async create(honor: IHonor): Promise<IHonor> {
    try {
      return await prisma.honors.create({
        data: honor,
      });
    } catch (error) {
      console.error("Error fetching honor.", error);
      throw error;
    }
  }

  async update(honorId: string, honorData: IHonor): Promise<IHonor> {
    try {
      return await prisma.honors.update({
        where: { id: honorId },
        data: honorData,
      });
    } catch (error) {
      console.error("Error updating honor.", error);
      throw error;
    }
  }

  async delete(honorId: string): Promise<IHonor> {
    try {
      return await prisma.honors.delete({
        where: { id: honorId },
      });
    } catch (error) {
      console.error("Error deleting honor.", error);
      throw error;
    }
  }
}

export const honorRepository = new HonorRepository();
