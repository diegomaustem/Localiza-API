import { Request, Response } from "express";
import { ICityService } from "../interfaces/City/ICityService";
import HttpError from "../errors/HttpError";
export class CityController {
  constructor(private readonly service: ICityService) {}

  listCities = async (req: Request, res: Response): Promise<void> => {
    try {
      const cities = await this.service.listCities();
      res.status(200).json({ data: { cities: cities } });
    } catch (error) {
      console.error("[Controller] - Error getting cities.", error);
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for cities.",
      });
    }
  };

  listCity = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.params.id;
      const city = await this.service.listCity(id);
      res.status(200).json({
        data: {
          city: city,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error getting city.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          mensagem: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for city.",
      });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const city = req.body;
      const createdCity = await this.service.create(city);
      res.status(201).json({
        message: "City created successfully.",
        data: {
          city: createdCity,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error creating city.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while creating city.",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const city = req.body;
      const updatedCity = await this.service.update(id, city);

      res.status(200).json({
        message: "City updated successfully.",
        data: {
          city: updatedCity,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error updating city.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          mensagem: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while updating city.",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deletedCity = await this.service.delete(id);
      res.status(200).json({
        message: "City deleted successfully.",
        data: {
          city: deletedCity,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error deleting city.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          mensagem: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while deleting city.",
      });
    }
  };
}
