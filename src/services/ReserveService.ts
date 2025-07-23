import HttpError from "../errors/HttpError";
import { IReserve } from "../interfaces/IReserve";
import { genericRepository } from "../repositories/GenericRepository";
import { reserveRepository } from "../repositories/ReserveRepository";
class ReserveService {
  async getReserves(): Promise<IReserve[]> {
    try {
      return await reserveRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve reserves.", error);
      throw error;
    }
  }

  async getReserve(reserveId: string): Promise<IReserve | null> {
    try {
      return await reserveRepository.findOne(reserveId);
    } catch (error) {
      console.error("Failed to retrieve reserve.", error);
      throw error;
    }
  }

  async createReserve(reserveData: IReserve): Promise<IReserve> {
    try {
      return await reserveRepository.create(reserveData);
    } catch (error) {
      console.error("Failed to create reserve.", error);
      throw error;
    }
  }

  async updateReserve(
    reserveData: IReserve,
    reserveId: string
  ): Promise<IReserve> {
    try {
      return await reserveRepository.update(reserveId, reserveData);
    } catch (error) {
      console.error("Failed to update reserve.", error);
      throw error;
    }
  }

  async deleteReserve(reserveId: string): Promise<IReserve> {
    try {
      return await reserveRepository.delete(reserveId);
    } catch (error) {
      console.error("Failed to delete reserve.", error);
      throw error;
    }
  }

  async reserveRulesValidation(
    reserveData?: IReserve,
    reserveId?: string
  ): Promise<void> {
    if (reserveData) {
      const { customers_id, vehicles_id } = reserveData;

      const [customerExists, vehicleExists, availableVehicle] =
        await Promise.all([
          customers_id
            ? genericRepository.generateQuery("customers", "id", customers_id)
            : Promise.resolve(false),
          vehicles_id
            ? genericRepository.generateQuery("vehicles", "id", vehicles_id)
            : Promise.resolve(false),
          vehicles_id
            ? genericRepository.generateQuery(
                "reserves",
                "vehicles_id",
                vehicles_id
              )
            : Promise.resolve(false),
        ]);

      if (customers_id && !customerExists) {
        throw new HttpError(
          "Cliente não encontrado. Insira um cliente válido.",
          404
        );
      }

      if (vehicles_id && !vehicleExists) {
        throw new HttpError(
          "Veículo não encontrado. Insira um veículo válido.",
          404
        );
      }

      if (vehicles_id && availableVehicle) {
        throw new HttpError(
          "Veículo indisponível para locação. Tente outro veículo.",
          404
        );
      }
    }
  }
}

export const reserveService = new ReserveService();
