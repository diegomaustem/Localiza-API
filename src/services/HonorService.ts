import { IHonor } from "../interfaces/IHonor";
import { honorRepository } from "../repositories/HonorRepository";
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
}

export const honorService = new HonorService();
