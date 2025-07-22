import { IVehicle } from "../interfaces/IVehicle";
import { v4 as uuidv4 } from "uuid";
import VehicleRepository from "../repositories/VehicleRepository";
import { genericRepository } from "../repositories/GenericRepository";
import HttpError from "../errors/HttpError";

class VehicleService {
  async getVehicles(): Promise<IVehicle[]> {
    try {
      return await VehicleRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve vehicles.", error);
      throw error;
    }
  }

  async getVehicle(vehicleId: string): Promise<IVehicle> {
    try {
      return await VehicleRepository.findOne(vehicleId);
    } catch (error) {
      console.error("Failed to retrieve vehicle.", error);
      throw error;
    }
  }

  async createVehicle(vehicle: IVehicle): Promise<IVehicle> {
    const newVehicle: IVehicle = {
      ...vehicle,
      id: uuidv4(),
    };

    try {
      return await VehicleRepository.create(newVehicle);
    } catch (error) {
      console.error("Failed to create vehicle.", error);
      throw error;
    }
  }

  async updateVehicle(
    vehicleId: string,
    vehicleData: IVehicle
  ): Promise<IVehicle> {
    try {
      return await VehicleRepository.update(vehicleId, vehicleData);
    } catch (error) {
      console.error("Failed to update vehicle.", error);
      throw error;
    }
  }

  async deleteVehicle(vehicleId: string): Promise<IVehicle> {
    try {
      return await VehicleRepository.delete(vehicleId);
    } catch (error) {
      console.error("Failed to delete vehicle.", error);
      throw error;
    }
  }

  async vehicleRulesValidation(
    vehicleData?: IVehicle,
    vehicleId?: string
  ): Promise<void> {
    if (vehicleId) {
      const isLinked = await genericRepository.generateQuery(
        "reserves",
        "vehicles_id",
        vehicleId
      );
      if (isLinked) {
        throw new HttpError(
          "Este veículo está vinculado a uma ou mais reservas e não pode ser excluído.",
          409
        );
      }
      return;
    }

    if (vehicleData) {
      const {
        chassi,
        plate,
        crlv_document,
        groups_id,
        units_id,
        categories_id,
      } = vehicleData;

      const [
        existingChassi,
        existingPlate,
        existingDocument,
        validGroup,
        validUnit,
        validCategory,
      ] = await Promise.all([
        chassi
          ? genericRepository.generateQuery("vehicles", "chassi", chassi)
          : null,
        plate
          ? genericRepository.generateQuery("vehicles", "plate", plate)
          : null,
        crlv_document
          ? genericRepository.generateQuery(
              "vehicles",
              "crlv_document",
              crlv_document
            )
          : null,
        groups_id
          ? genericRepository.generateQuery("groups", "id", groups_id)
          : null,
        units_id
          ? genericRepository.generateQuery("units", "id", units_id)
          : null,
        categories_id
          ? genericRepository.generateQuery("categories", "id", categories_id)
          : null,
      ]);

      if (existingChassi) {
        throw new HttpError(
          "Já existe um veículo registrado com este chassi. Tente outro valor.",
          409
        );
      }

      if (existingPlate) {
        throw new HttpError(
          "Já existe um veículo registrado com esta placa. Tente outro valor.",
          409
        );
      }

      if (existingDocument) {
        throw new HttpError(
          "O documento informado já existe em nossos registros. Tente outro valor.",
          409
        );
      }

      if (groups_id && !validGroup) {
        throw new HttpError(
          "O grupo informado não consta em nossos registros. Tente outro.",
          404
        );
      }

      if (units_id && !validUnit) {
        throw new HttpError(
          "A unidade informada não consta em nossos registros. Tente outra.",
          404
        );
      }

      if (categories_id && !validCategory) {
        throw new HttpError(
          "A categoria informada não consta em nossos registros. Tente outra.",
          404
        );
      }
    }
  }
}
export const vehicleService = new VehicleService();
