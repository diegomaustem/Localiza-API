import { IReserve } from "../interfaces/IReserve";
import { reserveRepository } from "../repositories/ReserveRepository";

class ReserveService {
  async getReserves(): Promise<IReserve[]> {
    try {
      return await reserveRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve reserves.", error);
      throw error;
    }
  }

  async getReserve(reserveId: string): Promise<IReserve | null> {
    try {
      return await reserveRepository.findOne(reserveId);
    } catch (error) {
      console.error("Failed to retrieve reserve.", error);
      throw error;
    }
  }

  async createReserve(reserveData: IReserve): Promise<IReserve> {
    try {
      return await reserveRepository.create(reserveData);
    } catch (error) {
      console.error("Failed to create reserve.", error);
      throw error;
    }
  }
}

export const reserveService = new ReserveService();
