import { Request, Response } from "express";
import { privilegeService } from "../services/PrivilegeService";
class PrivilegeController {
  async getPrivileges(req: Request, res: Response): Promise<void> {
    try {
      const privileges = await privilegeService.getPrivileges();
      res
        .status(200)
        .json({ code: 200, status: "success", privileges: privileges });
    } catch (error) {
      console.error("Error getting privileges.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar privilégios.",
      });
    }
  }

  async getPrivilege(req: Request, res: Response) {
    const privilegeId: string = req.params.id;

    try {
      const privilege = await privilegeService.getPrivilege(privilegeId);
      if (privilege === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Privilégio não encontrado.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        privilege: privilege,
      });
    } catch (error) {
      console.error("Error getting privilege.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar privilégio.",
      });
    }
  }
}

export const privilegeController = new PrivilegeController();
