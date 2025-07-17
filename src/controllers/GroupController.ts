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
        message: "Internal error while searching for groups.",
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
          message: "Group not found.",
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
        message: "Internal error while searching for group.",
      });
    }
  }

  async createGroup(req: Request, res: Response): Promise<void> {
    const groupData: IGroup = req.body;

    try {
      await groupService.groupRulesValidation(groupData);

      const createdGroup = await groupService.createGroup(groupData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Group created successfully.",
        createdGroup: createdGroup,
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

      console.error("Error creating group.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating group.",
      });
    }
  }
}

export const groupController = new GroupController();
