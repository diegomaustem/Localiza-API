import { INationality } from "../interfaces/INationality";
import { nationalityRepository } from "../repositories/NationalityRepository";

class NationalityService {
  async getNationalities(): Promise<INationality[]> {
    try {
      return await nationalityRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve nationalities.", error);
      throw error;
    }
  }

  async createNationality(nationality: INationality): Promise<INationality> {
    try {
      return await nationalityRepository.create(nationality);
    } catch (error) {
      console.error("Failed to create nationality.", error);
      throw error;
    }
  }
}

export const nationalityService = new NationalityService();
