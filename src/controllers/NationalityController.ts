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
          message: "Nationality not found.",
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
        message: "Internal error while searching for nationality.",
      });
    }
  }

  async createNationality(req: Request, res: Response): Promise<void> {
    const nationalityData: INationality = req.body;

    try {
      const createdNationality = await nationalityService.createNationality(
        nationalityData
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Nationality created successfully.",
        createdNationality: createdNationality,
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
          message: "Nationality not found for update.",
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
        message: "Nationality updated successfully.",
        updatedNationality: updatedNationality,
      });
    } catch (error) {
      console.error("Error updating nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while updating nationality.",
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
          message: "Nationality not found for deletion.",
        });
        return;
      }

      const deletedNationality = await nationalityService.deleteNationality(
        nationalityId
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Nationality deleted successfully.",
        deletedNationality: deletedNationality,
      });
    } catch (error) {
      console.error("Error deleting nationality.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while deleting nationality.",
      });
    }
  }
}

export const nationalityController = new NationalityController();
