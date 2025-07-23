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

  async updateCity(cityId: string, cityData: ICity): Promise<ICity> {
    try {
      return await cityRepository.update(cityId, cityData);
    } catch (error) {
      console.error("Failed to update city.", error);
      throw error;
    }
  }

  async deleteCity(cityId: string): Promise<ICity> {
    try {
      return await cityRepository.delete(cityId);
    } catch (error) {
      console.error("Failed to delete city.", error);
      throw error;
    }
  }

  async cityRulesValidation(cityData?: ICity, cityId?: string): Promise<void> {
    if (cityId) {
      const cityHasUnits = await genericRepository.generateQuery(
        "units",
        "cities_id",
        cityId
      );

      if (cityHasUnits) {
        throw new HttpError(
          "Esta cidade possui unidades vinculadas e não pode ser excluída.",
          409
        );
      }
      return;
    }

    if (cityData) {
      const { states_id } = cityData;
      const existState = states_id
        ? await genericRepository.generateQuery("states", "id", states_id)
        : false;

      if (states_id && !existState) {
        throw new HttpError("Estado não encontrado. Insira um válido.", 404);
      }
    }
  }
}

export const cityService = new CityService();
