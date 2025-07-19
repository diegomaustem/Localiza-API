import { Request, Response } from "express";
import { statusUserService } from "../services/StatusUserService";

class StatusUserController {
  async getStatusUsers(req: Request, res: Response): Promise<void> {
    try {
      const statusUsers = await statusUserService.getStatusUsers();
      res
        .status(200)
        .json({ code: 200, status: "success", statusUsers: statusUsers });
    } catch (error) {
      console.error("Error getting statusUsers.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao procurar por statusUsers",
      });
    }
  }

  async getStatusUser(req: Request, res: Response): Promise<void> {
    const statusUserId: string = req.params.id;

    try {
      const statusUser = await statusUserService.getStatusUser(statusUserId);
      if (statusUser === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "statusUser não encontrado.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        statusUser: statusUser,
      });
    } catch (error) {
      console.error("Error getting statusUser.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar statusUser.",
      });
    }
  }
}

export const statusUserController = new StatusUserController();
