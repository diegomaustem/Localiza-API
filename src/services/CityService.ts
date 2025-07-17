import HttpError from "../errors/HttpError";
import { ICity } from "../interfaces/ICity";
import { cityRepository } from "../repositories/CityRepository";
import { genericRepository } from "../repositories/GenericRepository";

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

  async cityRulesValidation(cityData: ICity, cityId?: string): Promise<void> {
    const hasState = await genericRepository.generateQuery(
      "states",
      "id",
      cityData.states_id
    );
    if (!hasState) {
      throw new HttpError("State not found. Enter a valid one.", 404);
    }
  }
}

export const cityService = new CityService();
