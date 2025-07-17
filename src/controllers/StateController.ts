class StateController {
  async getStates(req: Request, res: Response): Promise<void> {}

  async getState(req: Request, res: Response): Promise<void> {}

  async createState(req: Request, res: Response): Promise<void> {}
}

export const stateController = new StateController();
