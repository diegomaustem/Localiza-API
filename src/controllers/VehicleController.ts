import { Request, Response } from "express";
import { ICreateUser, IUser, IUserResponse } from "../interfaces/IUser";
import { ICreateVehicle } from "../interfaces/IVehicle";
import { vehicleService } from "../services/VehicleService";

class VehicleController {
  async getVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await vehicleService.getVehicles();
      res
        .status(200)
        .json({ code: 200, status: "success", vehicles: vehicles });
    } catch (error) {
      console.error("Error getting vehicles.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for vehicles.",
      });
    }
  }

  async getVehicle(req: Request, res: Response): Promise<void> {
    const vehicleId: string = req.params.id;

    try {
      const vehicle = await vehicleService.getVehicle(vehicleId);
      if (!vehicle) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Vehicle not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        user: vehicle,
      });
    } catch (error) {
      console.error("Error getting vehicle.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for vehicle.",
      });
    }
  }

  async createVehicle(req: Request, res: Response): Promise<void> {
    const vehicleData: ICreateVehicle = req.body;

    try {
      const vehicleCreated = await vehicleService.createVehicle(vehicleData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Vehicle created successfully.",
        vehicle: vehicleCreated,
      });
    } catch (error) {
      console.error("Error creating vehicle.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating vehicle.",
      });
    }
  }

  async deleteVehicle(req: Request, res: Response): Promise<void> {
    const vehiceId: string = req.params.id;

    try {
      const vehicle = await vehicleService.getVehicle(vehiceId);

      if (!vehicle) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Vehicle not found for deletion.",
        });
        return;
      }

      await vehicleService.deleteVehicle(vehiceId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Vehicle deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting vehicle.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while deleting vehicle.",
      });
    }
  }
}

export const vehicleController = new VehicleController();
