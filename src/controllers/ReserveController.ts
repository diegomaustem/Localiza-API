import { Request, Response } from "express";
import { reserveService } from "../services/ReserveService";
import { IReserve } from "../interfaces/IReserve";
import HttpError from "../errors/HttpError";
class ReserveController {
  async getReserves(req: Request, res: Response): Promise<void> {
    try {
      const reserves = await reserveService.getReserves();
      res
        .status(200)
        .json({ code: 200, status: "success", reserves: reserves });
    } catch (error) {
      console.error("Error getting reserves.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar reservas.",
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
          message: "Reserva não encontrada.",
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
        message: "Erro interno ao buscar reserva.",
      });
    }
  }

  async createReserve(req: Request, res: Response): Promise<void> {
    const reserveData: IReserve = req.body;

    try {
      await reserveService.reserveRulesValidation(reserveData, undefined);
      const createdReserve = await reserveService.createReserve(reserveData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Reserva criada com sucesso.",
        createdReserve: createdReserve,
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

      console.error("Error creating reserve.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao criar reserva.",
      });
    }
  }

  async updateReserve(req: Request, res: Response): Promise<void> {
    const reserveId: string = req.params.id;
    const reserveData: IReserve = req.body;

    try {
      const reserve = await reserveService.getReserve(reserveId);
      if (!reserve) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Reserva não encontrada para atualização.",
        });
        return;
      }

      await reserveService.reserveRulesValidation(reserveData, reserveId);

      const updatedReserve = await reserveService.updateReserve(
        reserveData,
        reserveId
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Reserva atualizada com sucesso.",
        updatedReserve: updatedReserve,
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

      console.error("Error updating reserve.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao atualizar reserva.",
      });
    }
  }

  async deleteReserve(req: Request, res: Response): Promise<void> {
    const reserveId: string = req.params.id;

    try {
      const reserve = await reserveService.getReserve(reserveId);
      if (!reserve) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Reserva não encontrada para exclusão.",
        });
        return;
      }

      const deletedReserve = await reserveService.deleteReserve(reserveId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Reserva excluída com sucesso.",
        deletedReserve: deletedReserve,
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
      console.error("Error deleting reserve.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao excluir reserva.",
      });
    }
  }
}

export const reserveController = new ReserveController();
