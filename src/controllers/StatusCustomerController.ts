import { Request, Response } from "express";
import { IStatusCustomerService } from "../interfaces/StatusCustomer/IStatusCustomerService";
import HttpError from "../errors/HttpError";

export class StatusCustomerController {
  constructor(private readonly service: IStatusCustomerService) {}

  listStatusCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
      const statusCustomers = await this.service.listStatusCustomers();
      res.status(200).json({
        data: {
          statusCustomers: statusCustomers,
        },
      });
    } catch (error) {
      console.error("Error getting statusCustomers.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while searching for statusCustomers.",
      });
    }
  };

  listStatusCustomer = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const statusCustomer = await this.service.listStatusCustomer(id);
      res.status(200).json({ data: { statusCustomer: statusCustomer } });
    } catch (error) {
      console.error("Error getting statusCustomer.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching statusCustomer.",
      });
    }
  };
}
