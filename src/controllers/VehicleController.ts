import { Request, Response } from "express";
import { IVehicle } from "../interfaces/IVehicle";
import { vehicleService } from "../services/VehicleService";
import HttpError from "../errors/HttpError";

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
        message: "Erro interno durante a busca de veículos.",
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
          message: "Veículo não encontrado..",
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
        message: "Erro interno durante a busca do veículo.",
      });
    }
  }

  async createVehicle(req: Request, res: Response): Promise<void> {
    const vehicleData: IVehicle = req.body;

    try {
      await vehicleService.vehicleRulesValidation(vehicleData, undefined);

      const vehicleCreated = await vehicleService.createVehicle(vehicleData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Veículo criado com sucesso.",
        vehicle: vehicleCreated,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.statusCode,
          status: "error",
          message: error.message,
        });
        return;
      }

      console.error("Error creating vehicle.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao criar o veículo.",
      });
    }
  }

  async updateVehicle(req: Request, res: Response): Promise<void> {
    const vehicleId: string = req.params.id;
    const vehicleData: IVehicle = req.body;

    try {
      const vehicle = await vehicleService.getVehicle(vehicleId);
      if (!vehicle) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Veículo não encontrado para atualização.",
        });
        return;
      }

      await vehicleService.vehicleRulesValidation(vehicleData, undefined);

      const updatedVehicle = await vehicleService.updateVehicle(
        vehicleId,
        vehicleData
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Veículo atualizado com sucesso.",
        vehicle: updatedVehicle,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.statusCode,
          status: "error",
          message: error.message,
        });
        return;
      }
      console.error("Error updating vehicle.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao atualizar o veículo.",
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
          message: "Veículo não encontrado para deleção.",
        });
        return;
      }

      await vehicleService.vehicleRulesValidation(undefined, vehiceId);
      await vehicleService.deleteVehicle(vehiceId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Veículo deletado com sucesso.",
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.statusCode,
          status: "error",
          message: error.message,
        });
        return;
      }
      console.error("Error deleting vehicle.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao tentar excluir veículo.",
      });
    }
  }
}

export const vehicleController = new VehicleController();
