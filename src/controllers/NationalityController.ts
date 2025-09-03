import { Request, Response } from "express";
import HttpError from "../errors/HttpError";
import { INationalityService } from "../interfaces/Nationality/ICategoryService";

export class NationalityController {
  constructor(private readonly service: INationalityService) {}

  listNationalities = async (req: Request, res: Response): Promise<void> => {
    try {
      const nationalities = await this.service.listNationalities();
      res.status(200).json({ data: { nationalities: nationalities } });
    } catch (error) {
      console.error("[Controller] - Error getting nationalities.", error);
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while fetching nationalities.",
      });
    }
  };

  listNationality = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const nationality = await this.service.listNationality(id);
      res.status(200).json({
        data: {
          nationality: nationality,
        },
      });
    } catch (error) {
      console.error("[Controller] - Error getting nationality.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while fetching nationality.",
      });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const nationalityData = req.body;
      const newNationality = await this.service.create(nationalityData);
      res.status(201).json({
        message: "Nationality created successfully.",
        data: { nationality: newNationality },
      });
    } catch (error) {
      console.error("[Controller] - Error creating nationality.", error);
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while creating nationality.",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const nationalityData = req.body;
      const updatedNationality = await this.service.update(id, nationalityData);
      res.status(200).json({
        message: "Nationality updated successfully.",
        data: { nationality: updatedNationality },
      });
    } catch (error) {
      console.error("[Controller] - Error updating nationality.", error);
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while updating nationality.",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deletedNationality = await this.service.delete(id);

      res.status(200).json({
        message: "Nationality deleted successfully.",
        data: {
          nationality: deletedNationality,
        },
      });
    } catch (error) {
      console.error("Error deleting nationality.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while deleting nationality.",
      });
    }
  };
}
