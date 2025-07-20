import { Request, Response } from "express";
import { statusUserService } from "../services/StatusUserService";
import { statusCustomerService } from "../services/StatusCustomerService";

class StatusCustomerController {
  async getStatusCustomers(req: Request, res: Response): Promise<void> {
    try {
      const statusCustomers = await statusCustomerService.getStatusCustomers();
      res.status(200).json({
        code: 200,
        status: "success",
        statusCustomers: statusCustomers,
      });
    } catch (error) {
      console.error("Error getting statusCustomers.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao procurar por statusCustomers",
      });
    }
  }

  async getStatusCustomer(req: Request, res: Response): Promise<void> {
    const statusCustomerId: string = req.params.id;

    try {
      const statusCustomer = await statusCustomerService.getStatusCustomer(
        statusCustomerId
      );
      if (statusCustomer === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "statusCustomer não encontrado.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        statusCustomer: statusCustomer,
      });
    } catch (error) {
      console.error("Error getting statusCustomer.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar statusCustomer.",
      });
    }
  }
}

export const statusCustomerController = new StatusCustomerController();
