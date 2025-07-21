import { Request, Response } from "express";
import { stateService } from "../services/StateService";
class StateController {
  async getStates(req: Request, res: Response): Promise<void> {
    try {
      const states = await stateService.getStates();
      res.status(200).json({ code: 200, status: "success", states: states });
    } catch (error) {
      console.error("Error getting states.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar estados.",
      });
    }
  }

  async getState(req: Request, res: Response): Promise<void> {
    const stateId: string = req.params.id;

    try {
      const state = await stateService.getState(stateId);
      if (!state) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Estado não encontrado.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        state: state,
      });
    } catch (error) {
      console.error("Error getting state.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar estado.",
      });
    }
  }
}

export const stateController = new StateController();
