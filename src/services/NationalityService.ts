import HttpError from "../errors/HttpError";
import { IGenericRepository } from "../interfaces/Generic/IGenericRepository";
import { INationalityRepository } from "../interfaces/Nationality/ICategoryRepository";
import { INationalityService } from "../interfaces/Nationality/ICategoryService";
import { INationality } from "../interfaces/Nationality/INationality";
import { INationalityCreation } from "../interfaces/Nationality/INationalityCreation";
import { INationalityUpdate } from "../interfaces/Nationality/INationalityUpdate";
import { genericRepository } from "../repositories/GenericRepository";

export class NationalityService implements INationalityService {
  constructor(
    private readonly repositoryNationality: INationalityRepository,
    private readonly repositoryGeneric: IGenericRepository
  ) {}

  async listNationalities(): Promise<INationality[]> {
    try {
      return await this.repositoryNationality.findMany();
    } catch (error) {
      console.error("[Service] - Failed to retrieve nationalities.", error);
      throw error;
    }
  }

  async listNationality(id: string): Promise<INationality | null> {
    try {
      const nationality = await this.repositoryNationality.findUnique(id);
      if (!nationality) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Nationality not found in our records.",
          404
        );
      }
      return nationality;
    } catch (error) {
      console.error("[Service] - Failed to retrieve nationality.", error);
      throw error;
    }
  }

  async create(nationality: INationality): Promise<INationality> {
    try {
      await this.validateNationality(nationality);
      return await this.repositoryNationality.create(nationality);
    } catch (error) {
      console.error("[Service] - Failed to create nationality.", error);
      throw error;
    }
  }

  async update(
    id: string,
    nationalityData: INationality
  ): Promise<INationality> {
    try {
      const nationality = await this.repositoryNationality.findUnique(id);
      if (!nationality) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Nationality not found in our records for update.",
          404
        );
      }
      await this.validateNationality(nationalityData);
      return await this.repositoryNationality.update(id, nationalityData);
    } catch (error) {
      console.error("[Service] - Failed to update nationality.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<INationality> {
    try {
      const nationality = await this.repositoryNationality.findUnique(id);
      if (!nationality) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Nationality not found in our records for deletion.",
          404
        );
      }

      await this.validateNationalityCustomer(id);
      return await this.repositoryNationality.delete(id);
    } catch (error) {
      console.error("Failed to delete nationality.", error);
      throw error;
    }
  }

  private async validateNationality(
    nationalityData: INationalityCreation | INationalityUpdate
  ): Promise<void> {
    const { name } = nationalityData;
    if (!name) return;

    const existingNationality = await this.repositoryGeneric.genericQuery(
      "nationality",
      "name",
      name
    );

    if (existingNationality) {
      throw new HttpError(
        "CONFLICT",
        "A record with this nationality already exists. Please try another one.",
        409
      );
    }
  }

  private async validateNationalityCustomer(id: string): Promise<void> {
    const hasLinkedCustomers = await genericRepository.generateQuery(
      "customer",
      "IdNationalities",
      id
    );

    if (hasLinkedCustomers) {
      throw new HttpError(
        "CONFLICT",
        "The nationality is linked to customers and cannot be deleted.",
        409
      );
    }
  }
}
