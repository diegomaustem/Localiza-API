import { IHonor } from "../interfaces/IHonor";
import { genericRepository } from "../repositories/GenericRepository";
import { honorRepository } from "../repositories/HonorRepository";
import { ValidPrismaTable } from "../types/PrismaTables";

class HonorService {
  async getHonors(): Promise<IHonor[]> {
    try {
      return await honorRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve honors.", error);
      throw error;
    }
  }

  async getHonor(honorId: string): Promise<IHonor | null> {
    try {
      return await honorRepository.findOne(honorId);
    } catch (error) {
      console.error("Failed to retrieve honor.", error);
      throw error;
    }
  }

  async createHonor(honor: IHonor): Promise<IHonor> {
    try {
      return await honorRepository.create(honor);
    } catch (error) {
      console.error("Failed to create honor.", error);
      throw error;
    }
  }

  async updateHonor(honorId: string, honorData: IHonor): Promise<IHonor> {
    try {
      return await honorRepository.update(honorId, honorData);
    } catch (error) {
      console.error("Failed to update honor.", error);
      throw error;
    }
  }

  async deleteHonor(honorId: string): Promise<IHonor> {
    try {
      return await honorRepository.delete(honorId);
    } catch (error) {
      console.error("Failed to delete honor.", error);
      throw error;
    }
  }

  async verifyCustomerHonor(honorId: string): Promise<boolean> {
    const table: ValidPrismaTable = "customers";
    const field = "honors_id";
    const value = honorId;

    return genericRepository.generateQuery(table, field, value);
  }
}

export const honorService = new HonorService();
