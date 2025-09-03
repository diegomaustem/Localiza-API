import HttpError from "../errors/HttpError";
import { IGenericRepository } from "../interfaces/Generic/IGenericRepository";
import { IUnit } from "../interfaces/Unit/IUnit";
import { IUnitCreation } from "../interfaces/Unit/IUnitCreation";
import { IUnitUpdate } from "../interfaces/Unit/IUnitUpdate";
import { IUnitRepository } from "../interfaces/Unit/IUnitRepository";
import { IUnitService } from "../interfaces/Unit/IUnitService";

export class UnitService implements IUnitService {
  constructor(
    private readonly repositoryUnit: IUnitRepository,
    private readonly repositoryGeneric: IGenericRepository
  ) {}

  async listUnits(): Promise<IUnit[]> {
    try {
      return await this.repositoryUnit.findMany();
    } catch (error) {
      console.error("[Service] - Failed to retrieve units.", error);
      throw error;
    }
  }

  async listUnit(id: string): Promise<IUnit | null> {
    try {
      const unit = await this.repositoryUnit.findUnique(id);
      if (!unit) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Unit not found in our records.",
          404
        );
      }
      return unit;
    } catch (error) {
      console.error("[Service] - Failed to retrieve unit.", error);
      throw error;
    }
  }

  async create(unit: IUnitCreation): Promise<IUnit> {
    try {
      await this.validateCityExist(unit);
      return await this.repositoryUnit.create(unit);
    } catch (error) {
      console.error("[Service] - Failed to create unit.", error);
      throw error;
    }
  }

  async update(id: string, unitData: IUnit): Promise<IUnit> {
    try {
      const unit = await this.repositoryUnit.findUnique(id);
      if (!unit) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Unit not found in our records for update.",
          404
        );
      }
      if (unitData.IdCity) {
        await this.validateCityExist(unit);
      }
      return await this.repositoryUnit.update(id, unitData);
    } catch (error) {
      console.error("[Service] - Failed to update unit.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<IUnit> {
    try {
      const unit = await this.repositoryUnit.findUnique(id);
      if (!unit) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Unit not found in our records for deletion.",
          404
        );
      }
      await this.validateUnitHasVehicles(unit);
      return await this.repositoryUnit.delete(id);
    } catch (error) {
      console.error("[Service] - Failed to delete unit.", error);
      throw error;
    }
  }

  private async validateCityExist(
    unit: IUnitCreation | IUnitUpdate
  ): Promise<void> {
    const { IdCity } = unit;
    if (!IdCity) return;

    const hasCity = await this.repositoryGeneric.genericQuery(
      "city",
      "id",
      IdCity
    );

    if (!hasCity) {
      throw new HttpError(
        "RESOURCE_NOT_FOUND",
        "The provided city is not in our records. Please try another one.",
        404
      );
    }
  }

  private async validateUnitHasVehicles(unit: IUnit): Promise<void> {
    const { id } = unit;
    if (!id) return;

    const hasVehicle = await this.repositoryGeneric.genericQuery(
      "vehicle",
      "IdUnit",
      id
    );

    if (hasVehicle) {
      throw new HttpError(
        "CONFLICT",
        "This unit is linked to vehicles and cannot be deleted.",
        409
      );
    }
  }
}
