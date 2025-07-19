import { Request, Response } from "express";
import { honorService } from "../services/HonorService";
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
}

export const honorController = new HonorController();
