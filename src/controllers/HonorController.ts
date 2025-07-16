import { Request, Response } from "express";
import { honorService } from "../services/HonorService";
import { IHonor } from "../interfaces/IHonor";
class HonorController {
  async getHonors(req: Request, res: Response): Promise<void> {
    try {
      const honors = await honorService.getHonors();
      res.status(200).json({ code: 200, status: "success", honors: honors });
    } catch (error) {
      console.error("Error getting honors.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for honors.",
      });
    }
  }

  async getHonor(req: Request, res: Response): Promise<void> {
    const honorId: string = req.params.id;

    try {
      const honor = await honorService.getHonor(honorId);
      if (honor === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Honor not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        honor: honor,
      });
    } catch (error) {
      console.error("Error getting honor.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for honor.",
      });
    }
  }

  async createHonor(req: Request, res: Response): Promise<void> {
    const honorData: IHonor = req.body;

    try {
      const createdHonor = await honorService.createHonor(honorData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Honor created successfully.",
        createdHonor: createdHonor,
      });
    } catch (error) {
      console.error("Error creating honor.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating honor.",
      });
    }
  }

  async updateHonor(req: Request, res: Response): Promise<void> {
    const honorId: string = req.params.id;
    const honorData: IHonor = req.body;

    try {
      const honor = await honorService.getHonor(honorId);
      if (!honor) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Honor not found for update.",
        });
        return;
      }

      const updatedHonor = await honorService.updateHonor(honorId, honorData);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Honor updated successfully.",
        updatedHonor: updatedHonor,
      });
    } catch (error) {
      console.error("Error updating honor.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while updating honor.",
      });
    }
  }

  async deleteHonor(req: Request, res: Response): Promise<void> {
    const honorId: string = req.params.id;

    try {
      const honor = await honorService.getHonor(honorId);

      if (!honor) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Honor not found for deletion.",
        });
        return;
      }

      const hasCustomerHonor = await honorService.verifyCustomerHonor(honorId);
      if (hasCustomerHonor) {
        res.status(409).json({
          code: 409,
          status: "error",
          message: "The honor is in use. It cannot be deleted.",
        });
        return;
      }

      const deletedHonor = await honorService.deleteHonor(honorId);
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Honor deleted successfully.",
        deletedHonor: deletedHonor,
      });
    } catch (error) {
      console.error("Error deleting honor.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while deleting honor.",
      });
    }
  }
}

export const honorController = new HonorController();
