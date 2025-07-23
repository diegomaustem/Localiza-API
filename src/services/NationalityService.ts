import HttpError from "../errors/HttpError";
import { INationality } from "../interfaces/INationality";
import { genericRepository } from "../repositories/GenericRepository";
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

  async getNationality(nationalityId: string): Promise<INationality | null> {
    try {
      return await nationalityRepository.findOne(nationalityId);
    } catch (error) {
      console.error("Failed to retrieve nationality.", error);
      throw error;
    }
  }

  async createNationality(
    nationalityData: INationality
  ): Promise<INationality> {
    try {
      return await nationalityRepository.create(nationalityData);
    } catch (error) {
      console.error("Failed to create nationality.", error);
      throw error;
    }
  }

  async updateNationality(
    nationalityId: string,
    nationalityData: INationality
  ): Promise<INationality> {
    try {
      return await nationalityRepository.update(nationalityId, nationalityData);
    } catch (error) {
      console.error("Failed to update nationality.", error);
      throw error;
    }
  }

  async deleteNationality(nationalityId: string): Promise<INationality> {
    try {
      return await nationalityRepository.delete(nationalityId);
    } catch (error) {
      console.error("Failed to delete nationality.", error);
      throw error;
    }
  }

  async nationalityRulesValidation(
    nationalityData?: INationality,
    nationalityId?: string
  ): Promise<void> {
    if (nationalityId) {
      const hasLinkedNationalities = await genericRepository.generateQuery(
        "customers",
        "nationalities_id",
        nationalityId
      );

      if (hasLinkedNationalities) {
        throw new HttpError(
          "A nacionalidade está vinculada a clientes e não pode ser excluída.",
          409
        );
      }
      return;
    }

    if (nationalityData) {
      const { name } = nationalityData;
      const existingNationality = name
        ? await genericRepository.generateQuery("nationalities", "name", name)
        : false;

      if (name && existingNationality) {
        throw new HttpError(
          "Já existe um registro com essa nacionalidade. Tente outra.",
          409
        );
      }
    }
  }
}

export const nationalityService = new NationalityService();
