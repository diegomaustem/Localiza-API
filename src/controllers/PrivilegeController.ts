import { Request, Response } from "express";
import { IPrivilege } from "../interfaces/IPrivilege";
import { privilegeService } from "../services/PrivilegeService";
import { genericRepository } from "../repositories/GenericRepository";
import { ValidPrismaTable } from "../types/PrismaTables";
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

  async getPrivilege(req: Request, res: Response) {
    const privilegeId: string = req.params.id;

    try {
      const privilege = await privilegeService.getPrivilege(privilegeId);
      if (privilege === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Privilege not found.",
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
        message: "Internal error while searching for privilege.",
      });
    }
  }

  async createPrivilege(req: Request, res: Response): Promise<void> {
    const privilegeData: IPrivilege = req.body;

    try {
      const hasPrivigele = await privilegeController.getHasPrivilege(
        privilegeData
      );
      if (hasPrivigele) {
        res.status(409).json({
          code: 409,
          status: "conflict",
          message: "There is already a privilege with that name.",
        });
        return;
      }
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
      console.error(error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while tcreating privilege.",
      });
    }
  }

  async updatePrivilege(req: Request, res: Response): Promise<void> {
    const privilegeId: string = req.params.id;
    const privilegeData: IPrivilege = req.body;

    try {
      const hasPrivigele = await privilegeController.getHasPrivilege(
        privilegeData
      );
      if (hasPrivigele) {
        res.status(409).json({
          code: 409,
          status: "conflict",
          message: "There is already a privilege with that name.",
        });
        return;
      }

      const privilege = await privilegeService.getPrivilege(privilegeId);
      if (!privilege) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Privilege not found for update.",
        });
        return;
      }

      const updatedPrivilege = await privilegeService.updatePrivilege(
        privilegeId,
        privilegeData
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Privilege updated successfully.",
        privilege: updatedPrivilege,
      });
    } catch (error) {
      console.error("Error updating privilege.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while updating privilege.",
      });
    }
  }

  async deletePrivilege(req: Request, res: Response): Promise<void> {
    const privilegeId: string = req.params.id;

    try {
      const privilege = await privilegeService.getPrivilege(privilegeId);

      if (!privilege) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Privilege not found for deletion.",
        });
        return;
      }

      await privilegeService.deletePrivilege(privilegeId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Privilege deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting privilege.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while deleting privilege.",
      });
    }
  }

  private getHasPrivilege(privilegeData: IPrivilege): Promise<boolean> {
    const table: ValidPrismaTable = "privileges";
    const field = "name";
    const value = privilegeData.name;

    return genericRepository.generateQuery(table, field, value);
  }
}

export const privilegeController = new PrivilegeController();
