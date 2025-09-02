import HttpError from "../errors/HttpError";
import { ICity } from "../interfaces/City/ICity";
import { ICityService } from "../interfaces/City/ICityService";
import { ICityRepository } from "../interfaces/City/ICityRepository";
import { ICityCreation } from "../interfaces/City/ICityCreation";
import { ICityUpdate } from "../interfaces/City/ICityUpdate";
import { IGenericRepository } from "../interfaces/Generic/IGenericRepository";

export class CityService implements ICityService {
  constructor(
    private readonly repositoryCity: ICityRepository,
    private readonly repositoryGeneric: IGenericRepository
  ) {}

  async listCities(): Promise<ICity[]> {
    try {
      return await this.repositoryCity.findMany();
    } catch (error) {
      console.error("[Service] - Failed to retrieve cities.", error);
      throw error;
    }
  }

  async listCity(id: string): Promise<ICity | null> {
    try {
      const city = await this.repositoryCity.findUnique(id);
      if (!city) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "City not found in our records.",
          404
        );
      }
      return city;
    } catch (error) {
      console.error("[Service] - Failed to retrieve city.", error);
      throw error;
    }
  }

  async create(city: ICity): Promise<ICity> {
    try {
      await this.validateCityState(city);
      return await this.repositoryCity.create(city);
    } catch (error) {
      console.error("[Service] - Failed to create city.", error);
      throw error;
    }
  }

  async update(id: string, cityData: ICity): Promise<ICity> {
    try {
      const city = await this.repositoryCity.findUnique(id);
      if (!city) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "City not found in our records for update.",
          404
        );
      }
      await this.validateCityState(cityData);
      return await this.repositoryCity.update(id, cityData);
    } catch (error) {
      console.error("[Service] - Failed to update city.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<ICity> {
    try {
      const city = await this.repositoryCity.findUnique(id);
      if (!city) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "City not found in our records for deletion.",
          404
        );
      }
      await this.validateCityDeletion(id);
      return await this.repositoryCity.delete(id);
    } catch (error) {
      console.error("[Service] - Failed to delete city.", error);
      throw error;
    }
  }

  private async validateCityState(
    city: ICityCreation | ICityUpdate
  ): Promise<void> {
    console.log(city);
    const { IdState } = city;
    if (!IdState) return;
    const existingState = await this.repositoryGeneric.genericQuery(
      "state",
      "id",
      IdState
    );

    if (!existingState) {
      throw new HttpError(
        "RESOURCE_NOT_FOUND",
        "The provided state is not in our records. Please try another one.",
        404
      );
    }
  }

  private async validateCityDeletion(id: string): Promise<void> {
    const unitsLinkedToCity = await this.repositoryGeneric.genericQuery(
      "unit",
      "IdCity",
      id
    );

    if (unitsLinkedToCity) {
      throw new HttpError(
        "CONFLICT",
        "The city cannot be deleted. There are units linked to it.",
        409
      );
    }
  }
}
