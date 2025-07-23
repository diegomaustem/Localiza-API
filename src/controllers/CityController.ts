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
        message: "Erro interno ao procurar cidades.",
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
          message: "Cidade não encontrada.",
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
        message: "Erro interno ao procurar cidade.",
      });
    }
  }

  async createCity(req: Request, res: Response): Promise<void> {
    const cityData: ICity = req.body;

    try {
      await cityService.cityRulesValidation(cityData, undefined);

      const createdCity = await cityService.createCity(cityData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Cidade criada com sucesso.",
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
        message: "Erro interno ao criar cidade.",
      });
    }
  }

  async updateCity(req: Request, res: Response): Promise<void> {
    const cityId: string = req.params.id;
    const cityData: ICity = req.body;

    try {
      const city = await cityService.getCity(cityId);
      if (!city) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Cidade não encontrada para atualização.",
        });
        return;
      }

      await cityService.cityRulesValidation(cityData, undefined);

      const updatedCity = await cityService.updateCity(cityId, cityData);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Cidade atualizada com sucesso.",
        updatedCity: updatedCity,
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

      console.error("Error updating city.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao atualizar cidade.",
      });
    }
  }

  async deleteCity(req: Request, res: Response): Promise<void> {
    const cityId: string = req.params.id;

    try {
      const city = await cityService.getCity(cityId);

      if (!city) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Cidade não encontrada para exclusão.",
        });
        return;
      }

      await cityService.cityRulesValidation(undefined, cityId);

      const deletedCity = await cityService.deleteCity(cityId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Cidade excluída com sucesso.",
        deletedCity: deletedCity,
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
      console.error("Error deleting city.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao excluir cidade.",
      });
    }
  }
}

export const cityController = new CityController();
