import { Request, Response } from "express";
import { nationalityService } from "../services/NationalityService";
import { INationality } from "../interfaces/INationality";

class NationalityController {
  async getNationalities(req: Request, res: Response): Promise<void> {
    try {
      const nationalities = await nationalityService.getNationalities();
      res
        .status(200)
        .json({ code: 200, status: "success", nationalities: nationalities });
    } catch (error) {
      console.error("Error getting nationalities.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for nationalities.",
      });
    }
  }

  async createNationality(req: Request, res: Response): Promise<void> {
    const nationalityData: INationality = req.body;

    try {
      const nationalityCreated = await nationalityService.createNationality(
        nationalityData
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Nationality created successfully.",
        nationalityCreated: nationalityCreated,
      });
    } catch (error) {
      console.error("Error creating nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating nationality.",
      });
    }
  }
}

export const nationalityController = new NationalityController();
