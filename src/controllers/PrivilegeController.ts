import { Request, Response } from "express";
import { ServicePrivilege } from "../services/PrivilegeService";
import HttpError from "../errors/HttpError";

export class PrivilegeController {
  constructor(private readonly service: ServicePrivilege) {}

  listPrivileges = async (req: Request, res: Response): Promise<void> => {
    try {
      const privileges = await this.service.listPrivileges();
      res.status(200).json({ data: { privileges: privileges } });
    } catch (error) {
      console.error("[Controller] - Error fetching privileges.", error);
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "Internal error while fetching privileges. Please try again later.",
      });
    }
  };

  listPrivilege = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const privilege = await this.service.listPrivilege(id);
      res.status(200).json({ data: { privilege: privilege } });
    } catch (error) {
      console.error("[Controller] - Error fetching privilege.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          mensagem: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching privilege. Please try again later.",
      });
    }
  };
}
