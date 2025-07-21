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
        message: "Unidade criada com sucesso.",
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
        message: "Erro interno ao criar unidade.",
      });
    }
  }

  async updateUnit(req: Request, res: Response): Promise<void> {
    const unitId: string = req.params.id;
    const unitData: IUnit = req.body;

    try {
      const unit = await unitService.getUnit(unitId);
      if (!unit) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Unidade não encontrada para atualização.",
        });
        return;
      }

      await unitService.unitRulesValidation(unitData);

      const updatedUnit = await unitService.updateUnit(unitId, unitData);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Unidade atualizada com sucesso.",
        updatedUnit: updatedUnit,
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

      console.error("Error updating unit.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao atualizar unidade.",
      });
    }
  }

  async deleteUnit(req: Request, res: Response): Promise<void> {
    const unitId: string = req.params.id;

    try {
      const unit = await unitService.getUnit(unitId);

      if (!unit) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Unidade não encontrada para exclusão.",
        });
        return;
      }

      await unitService.unitRulesValidation(undefined, unitId);

      const deletedUnit = await unitService.deleteUnit(unitId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Unidade excluída com sucesso.",
        deletedUnit: deletedUnit,
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
      console.error("Error deleting unit.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao excluir unidade.",
      });
    }
  }
}

export const unitController = new UnitController();
