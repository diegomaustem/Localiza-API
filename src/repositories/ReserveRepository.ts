import { IReserve } from "../interfaces/IReserve";
import prisma from "../lib/prisma";

class ReserveRepository {
  async findMany(): Promise<IReserve[]> {
    try {
      return await prisma.reserves.findMany();
    } catch (error) {
      console.error("Error fetching reserves.", error);
      throw error;
    }
  }

  async findOne(reserveId: string): Promise<IReserve | null> {
    try {
      return await prisma.reserves.findUnique({
        where: { id: reserveId },
      });
    } catch (error) {
      console.error("Error fetching reserve.", error);
      throw error;
    }
  }

  async create(reserveData: IReserve): Promise<IReserve> {
    try {
      return await prisma.reserves.create({
        data: reserveData,
      });
    } catch (error) {
      console.error("Error creating reserve.", error);
      throw error;
    }
  }
}

export const reserveRepository = new ReserveRepository();
