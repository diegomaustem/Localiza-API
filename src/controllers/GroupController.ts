import { Request, Response } from "express";
import HttpError from "../errors/HttpError";
import { IGroupService } from "../interfaces/Group/IGroupService";
export class GroupController {
  constructor(private readonly service: IGroupService) {}

  listGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const groups = await this.service.listGroups();
      res.status(200).json({ data: { groups: groups } });
    } catch (error) {
      console.error("[Controller] - Error getting groups.", error);

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for groups.",
      });
    }
  };

  listGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const group = await this.service.listGroup(id);
      res.status(200).json({
        data: {
          group: group,
        },
      });
    } catch (error) {
      console.error("Error getting group.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for group.",
      });
    }
  };
}
