import { ICreateVehicle, IVehicle } from "../interfaces/IVehicle";
import { v4 as uuidv4 } from "uuid";
import VehicleRepository from "../repositories/VehicleRepository";

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

  async createVehicle(vehicle: ICreateVehicle): Promise<IVehicle> {
    const newVehicle: ICreateVehicle = {
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

  async deleteVehicle(vehicleId: string): Promise<IVehicle> {
    try {
      return await VehicleRepository.delete(vehicleId);
    } catch (error) {
      console.error("Failed to delete vehicle.", error);
      throw error;
    }
  }
}
export const vehicleService = new VehicleService();
