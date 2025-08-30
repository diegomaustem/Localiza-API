import { Request, Response } from "express";
import { IStatusUserService } from "../interfaces/StatusUser/IStatusUserService";
import HttpError from "../errors/HttpError";
export class StatusUserController {
  constructor(private readonly service: IStatusUserService) {}

  listStatusUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const statusUsers = await this.service.listStatusUsers();
      res.status(200).json({ data: { statusUsers: statusUsers } });
    } catch (error) {
      console.error("Error getting statusUsers.", error);

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for statusUsers.",
      });
    }
  };

  listStatusUser = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
      const statusUser = await this.service.listStatusUser(id);
      res.status(200).json({ data: { statusUsers: statusUser } });
    } catch (error) {
      console.error("Error getting statusUser.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching statusUser.",
      });
    }
  };
}
