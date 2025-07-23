import { Request, Response } from "express";
import { nationalityService } from "../services/NationalityService";
import { INationality } from "../interfaces/INationality";
import HttpError from "../errors/HttpError";
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
        message: "Erro interno ao buscar nacionalidades.",
      });
    }
  }

  async getNationality(req: Request, res: Response) {
    const nationalityId: string = req.params.id;

    try {
      const nationality = await nationalityService.getNationality(
        nationalityId
      );
      if (nationality === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Nacionalidade não encontrada.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        nationality: nationality,
      });
    } catch (error) {
      console.error("Error getting nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar nacionalidade.",
      });
    }
  }

  async createNationality(req: Request, res: Response): Promise<void> {
    const nationalityData: INationality = req.body;

    try {
      await nationalityService.nationalityRulesValidation(nationalityData);

      const createdNationality = await nationalityService.createNationality(
        nationalityData
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Nacionalidade criada com sucesso.",
        createdNationality: createdNationality,
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

      console.error("Error creating nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao criar nacionalidade.",
      });
    }
  }

  async updateNationality(req: Request, res: Response): Promise<void> {
    const nationalityId: string = req.params.id;
    const nationalityData: INationality = req.body;

    try {
      const nationality = await nationalityService.getNationality(
        nationalityId
      );
      if (!nationality) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Nacionalidade não encontrada para atualização.",
        });
        return;
      }

      const updatedNationality = await nationalityService.updateNationality(
        nationalityId,
        nationalityData
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Nacionalidade atualizada com sucesso.",
        updatedNationality: updatedNationality,
      });
    } catch (error) {
      console.error("Error updating nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao atualizar nacionalidade.",
      });
    }
  }

  async deleteNationality(req: Request, res: Response): Promise<void> {
    const nationalityId: string = req.params.id;

    try {
      const nationality = await nationalityService.getNationality(
        nationalityId
      );

      if (!nationality) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Nacionalidade não encontrada para exclusão.",
        });
        return;
      }

      await nationalityService.nationalityRulesValidation(
        undefined,
        nationalityId
      );

      const deletedNationality = await nationalityService.deleteNationality(
        nationalityId
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Nacionalidade excluída com sucesso.",
        deletedNationality: deletedNationality,
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
      console.error("Error deleting nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao excluir nacionalidade.",
      });
    }
  }
}

export const nationalityController = new NationalityController();
