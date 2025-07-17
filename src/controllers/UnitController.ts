import { Request, Response } from "express";

class UnitController {
  async getUnits(req: Request, res: Response): Promise<void> {}

  async getUnit(req: Request, res: Response): Promise<void> {}

  async createUnit(req: Request, res: Response): Promise<void> {}
}

export const unitController = new UnitController();
