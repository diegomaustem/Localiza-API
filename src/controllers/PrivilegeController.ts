import { Request, Response } from "express";
import { IPrivilege } from "../interfaces/IPrivilege";
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
        message: "Internal error while searching for privileges.",
      });
    }
  }

  async createPrivilege(req: Request, res: Response): Promise<void> {
    const privilegeData: IPrivilege = req.body;

    try {
      const privilegeCreated = await privilegeService.createPrivigele(
        privilegeData
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Privilege created successfully.",
        privilegeCreated: privilegeCreated,
      });
    } catch (error) {
      console.error("Error creating privilege.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating privilege.",
      });
    }
  }
}

export const privilegeController = new PrivilegeController();
