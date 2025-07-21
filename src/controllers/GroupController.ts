import { Request, Response } from "express";
import { groupService } from "../services/GroupService";
import { IGroup } from "../interfaces/IGroup";
import HttpError from "../errors/HttpError";

class GroupController {
  async getGroups(req: Request, res: Response): Promise<void> {
    try {
      const groups = await groupService.getGroups();
      res.status(200).json({ code: 200, status: "success", groups: groups });
    } catch (error) {
      console.error("Error getting groups.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao procurar por grupos.",
      });
    }
  }

  async getGroup(req: Request, res: Response): Promise<void> {
    const groupId: string = req.params.id;

    try {
      const group = await groupService.getGroup(groupId);
      if (!group) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Grupo não encontrado.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        group: group,
      });
    } catch (error) {
      console.error("Error getting group.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao procurar por grupo.",
      });
    }
  }
}

export const groupController = new GroupController();
