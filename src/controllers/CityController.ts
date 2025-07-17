import { Request, Response } from "express";
import { ICity } from "../interfaces/ICity";
import { cityService } from "../services/CityService";
import HttpError from "../errors/HttpError";

class CityController {
  async getCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await cityService.getCities();
      res.status(200).json({ code: 200, status: "success", cities: cities });
    } catch (error) {
      console.error("Error getting cities.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for cities.",
      });
    }
  }

  async getCity(req: Request, res: Response): Promise<void> {
    const cityId: string = req.params.id;

    try {
      const city = await cityService.getCity(cityId);
      if (!city) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "City not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        city: city,
      });
    } catch (error) {
      console.error("Error getting city.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for city.",
      });
    }
  }

  async createCity(req: Request, res: Response): Promise<void> {
    const cityData: ICity = req.body;

    try {
      await cityService.cityRulesValidation(cityData);

      const createdCity = await cityService.createCity(cityData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "City created successfully.",
        createdCity: createdCity,
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

      console.error("Error creating city.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating city.",
      });
    }
  }
}

export const cityController = new CityController();
