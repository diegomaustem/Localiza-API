import { IVehicle, ICreateVehicle } from "../interfaces/IVehicle";
import prisma from "../lib/prisma";

class VehicleRepository {
  async findMany(): Promise<IVehicle[]> {
    try {
      return await prisma.vehicles.findMany();
    } catch (error) {
      console.error("Error fetching vehicles.", error);
      throw error;
    }
  }

  async create(vehicle: ICreateVehicle): Promise<IVehicle> {
    try {
      return await prisma.vehicles.create({
        data: vehicle,
      });
    } catch (error) {
      console.error("Error fetching vehicles.", error);
      throw error;
    }
  }
}

export default new VehicleRepository();
