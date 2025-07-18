import { Request, Response } from "express";
import { reserveService } from "../services/ReserveService";
import { IReserve } from "../interfaces/IReserve";

class ReserveController {
  async getReserves(req: Request, res: Response): Promise<void> {
    try {
      const reserves = await reserveService.getReserves;
      res
        .status(200)
        .json({ code: 200, status: "success", reserves: reserves });
    } catch (error) {
      console.error("Error getting reserves.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for reserves.",
      });
    }
  }

  async getReserve(req: Request, res: Response): Promise<void> {
    const reserveId: string = req.params.id;

    try {
      const reserve = await reserveService.getReserve(reserveId);
      if (!reserve) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Reserve not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        reserve: reserve,
      });
    } catch (error) {
      console.error("Error getting reserve.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for reserve.",
      });
    }
  }

  async createReserve(req: Request, res: Response): Promise<void> {
    const reserveData: IReserve = req.body;

    try {
      const createdReserve = await reserveService.createReserve(reserveData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Reserve created successfully.",
        createdReserve: createdReserve,
      });
    } catch (error) {
      console.error("Error creating reserve.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating reserve.",
      });
    }
  }
}

export const reserveController = new ReserveController();
