import { Request, Response } from "express";
import HttpError from "../errors/HttpError";
import { IUnitService } from "../interfaces/Unit/IUnitService";
export class UnitController {
  constructor(private readonly service: IUnitService) {}

  listUnits = async (req: Request, res: Response): Promise<void> => {
    try {
      const units = await this.service.listUnits();
      res.status(200).json({ data: { units: units } });
    } catch (error) {
      console.error("[Controller] - Error getting units.", error);

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for units.",
      });
    }
  };

  listUnit = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const unit = this.service.listUnit(id);
      res.status(200).json({
        data: {
          unit: unit,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error getting unit.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while fetching unit.",
      });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const unit = req.body;
      const createdUnit = await this.service.create(unit);
      res.status(201).json({
        message: "Unit created successfully.",
        data: {
          unit: createdUnit,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error creating unit.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while creating unit.",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const unitData = req.body;
      const updatedUnit = await this.service.update(id, unitData);
      res.status(200).json({
        message: "Unit updated successfully.",
        data: {
          unit: updatedUnit,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error updating unit.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while updating unit.",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deletedUnit = await this.service.delete(id);
      res.status(200).json({
        message: "Unit deleted successfully.",
        data: {
          unit: deletedUnit,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error deleting unit.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while deleting unit.",
      });
    }
  };
}
