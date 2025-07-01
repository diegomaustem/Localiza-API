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

  async findOne(vehicleId: string): Promise<IVehicle> {
    try {
      return await prisma.vehicles.findUnique({
        where: { id: vehicleId },
      });
    } catch (error) {
      console.error("Error fetching vehicle.", error);
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

  async delete(vehicleId: string): Promise<IVehicle> {
    try {
      return await prisma.vehicles.delete({
        where: { id: vehicleId },
      });
    } catch (error) {
      console.error("Error deleting vehicle.", error);
      throw error;
    }
  }
}

export default new VehicleRepository();
