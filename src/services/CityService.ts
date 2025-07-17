import { ICity } from "../interfaces/ICity";
import { cityRepository } from "../repositories/CityRepository";

class CityService {
  async getCities(): Promise<ICity[]> {
    try {
      return await cityRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve cities.", error);
      throw error;
    }
  }

  async getCity(cityId: string): Promise<ICity | null> {
    try {
      return await cityRepository.findOne(cityId);
    } catch (error) {
      console.error("Failed to retrieve city.", error);
      throw error;
    }
  }

  async createCity(cityData: ICity): Promise<ICity> {
    try {
      return await cityRepository.create(cityData);
    } catch (error) {
      console.error("Failed to create city.", error);
      throw error;
    }
  }
}

export const cityService = new CityService();
