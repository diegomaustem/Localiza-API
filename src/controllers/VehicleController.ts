import { Request, Response } from "express";
import { ICreateUser, IUser, IUserResponse } from "../interfaces/IUser";
import { ICreateVehicle } from "../interfaces/IVehicle";
import { vehicleService } from "../services/VehicleService";

class VehicleController {
  async getVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await vehicleService.getUsers();
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

  async createVehicle(req: Request, res: Response): Promise<void> {
    const vehicleData: ICreateVehicle = req.body;

    try {
      const vehicleCreated = await vehicleService.createUser(vehicleData);

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

  private parseUsersDataResponse(users: IUser[] | IUser): IUserResponse[] {
    const userList = Array.isArray(users) ? users : [users];

    return userList.map((user) => ({
      ...user,
      cpf: user.cpf.toString(),
      rg: user.rg.toString(),
      numeroCarteira: user.numeroCarteira.toString(),
    }));
  }
}

export const vehicleController = new VehicleController();
