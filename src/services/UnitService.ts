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

  async updateUnit(unitId: string, unitData: IUnit): Promise<IUnit> {
    try {
      return await unitRepository.update(unitId, unitData);
    } catch (error) {
      console.error("Failed to update unit.", error);
      throw error;
    }
  }

  async deleteUnit(unitId: string): Promise<IUnit> {
    try {
      return await unitRepository.delete(unitId);
    } catch (error) {
      console.error("Failed to delete unit.", error);
      throw error;
    }
  }

  async unitRulesValidation(unitData?: IUnit, unitId?: string): Promise<void> {
    if (unitId) {
      const hasLinkedVehicles = await genericRepository.generateQuery(
        "vehicles",
        "units_id",
        unitId
      );

      if (hasLinkedVehicles) {
        throw new HttpError(
          "Esta unidade está vinculada a veículos e não pode ser excluída.",
          409
        );
      }
      return;
    }

    if (unitData) {
      const { cities_id } = unitData;

      const hasCity = cities_id
        ? await genericRepository.generateQuery("cities", "id", cities_id)
        : false;

      if (cities_id && !hasCity) {
        throw new HttpError("Cidade não encontrada. Tente outra.", 404);
      }
    }
  }
}

export const unitService = new UnitService();
