import { Request, Response } from "express";
import { IStateService } from "../interfaces/State/IStateService";
import HttpError from "../errors/HttpError";
export class StateController {
  constructor(private readonly service: IStateService) {}

  listStates = async (req: Request, res: Response): Promise<void> => {
    try {
      const states = await this.service.listStates();
      res.status(200).json({ data: { states: states } });
    } catch (error) {
      console.error("[Controller] - Error getting states.", error);

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching states.",
      });
    }
  };

  listState = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const state = await this.service.listState(id);
      res.status(200).json({ data: { state: state } });
    } catch (error) {
      console.error("[Controller] - Error getting state.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching state.",
      });
    }
  };
}
