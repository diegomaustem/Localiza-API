import { IState } from "../interfaces/IState";
import { Request, Response } from "express";
import { stateService } from "../services/StateService";
import HttpError from "../errors/HttpError";

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
        message: "Internal error while searching for states.",
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
          message: "State not found.",
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
        message: "Internal error while searching for state.",
      });
    }
  }

  async createState(req: Request, res: Response): Promise<void> {
    const stateData: IState = req.body;

    try {
      await stateService.stateRulesValidation(stateData);

      const createdState = await stateService.createState(stateData);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "State created successfully.",
        createdState: createdState,
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

      console.error("Error creating state.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating state.",
      });
    }
  }
}

export const stateController = new StateController();
