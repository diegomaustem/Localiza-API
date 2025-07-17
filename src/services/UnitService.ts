import HttpError from "../errors/HttpError";
import { IUnit } from "../interfaces/IUnit";
import { genericRepository } from "../repositories/GenericRepository";
import { unitRepository } from "../repositories/UnitRepository";

class UnitService {
  async getUnits(): Promise<IUnit[]> {
    try {
      return await unitRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve units.", error);
      throw error;
    }
  }

  async getUnit(unitId: string): Promise<IUnit | null> {
    try {
      return await unitRepository.findOne(unitId);
    } catch (error) {
      console.error("Failed to retrieve unit.", error);
      throw error;
    }
  }

  async createUnit(unitData: IUnit): Promise<IUnit> {
    try {
      return await unitRepository.create(unitData);
    } catch (error) {
      console.error("Failed to create unit.", error);
      throw error;
    }
  }

  async unitRulesValidation(unitData: IUnit, unitId?: string): Promise<void> {
    const hasCity = await genericRepository.generateQuery(
      "cities",
      "id",
      unitData.cities_id
    );
    if (!hasCity) {
      throw new HttpError("City not found. Enter a valid one.", 404);
    }
  }
}

export const unitService = new UnitService();
