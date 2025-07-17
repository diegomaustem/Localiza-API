import { Request, Response } from "express";
import { IUnit } from "../interfaces/IUnit";
import { unitService } from "../services/UnitService";
import HttpError from "../errors/HttpError";

class UnitController {
  async getUnits(req: Request, res: Response): Promise<void> {
    try {
      const units = await unitService.getUnits();
      res.status(200).json({ code: 200, status: "success", units: units });
    } catch (error) {
      console.error("Error getting units.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for units.",
      });
    }
  }

  async getUnit(req: Request, res: Response): Promise<void> {
    const unitId: string = req.params.id;

    try {
      const unit = await unitService.getUnit(unitId);
      if (!unit) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Unit not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        unit: unit,
      });
    } catch (error) {
      console.error("Error getting unit.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for unit.",
      });
    }
  }

  async createUnit(req: Request, res: Response): Promise<void> {
    const unitData: IUnit = req.body;

    try {
      await unitService.unitRulesValidation(unitData);

      const createdUnit = await unitService.createUnit(unitData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Unit created successfully.",
        createdUnit: createdUnit,
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

      console.error("Error creating unit.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating unit.",
      });
    }
  }
}

export const unitController = new UnitController();
