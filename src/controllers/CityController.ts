import { Request, Response } from "express";

class CityController {
  async getCities(req: Request, res: Response): Promise<void> {}

  async getCity(req: Request, res: Response): Promise<void> {}

  async createCity(req: Request, res: Response): Promise<void> {}
}

export const cityController = new CityController();
