import { Request, Response } from "express";
import { customerService } from "../services/CustomerService";
import { ICustomer } from "../interfaces/ICustomer";
import HttpError from "../errors/HttpError";
class CustomerController {
  async getCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers = await customerService.getCustomers();
      res
        .status(200)
        .json({ code: 200, status: "success", customers: customers });
    } catch (error) {
      console.error("Error getting customers.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for customers.",
      });
    }
  }

  async getCustomer(req: Request, res: Response): Promise<void> {
    const customerId: string = req.params.id;

    try {
      const customer = await customerService.getCustomer(customerId);
      if (!customer) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Customer not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        customer: customer,
      });
    } catch (error) {
      console.error("Error getting customer.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for customer.",
      });
    }
  }

  async createCustomer(req: Request, res: Response): Promise<void> {
    const customerData: ICustomer = req.body;

    try {
      await customerService.customerRulesValidation(customerData);

      const createdCustomer = await customerService.createCustomer(
        customerData
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Customer created successfully.",
        createdCustomer: createdCustomer,
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

      console.error("Error creating customer.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating customer.",
      });
    }
  }

  async updateCustomer(req: Request, res: Response): Promise<void> {
    const customerId: string = req.params.id;
    const customerData: ICustomer = req.body;

    try {
      const customer = await customerService.getCustomer(customerId);
      if (!customer) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Customer not found for update.",
        });
        return;
      }

      await customerService.customerRulesValidation(customerData, customerId);

      const updatedCustomer = await customerService.updateCustomer(
        customerId,
        customerData
      );
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Customer updated successfully.",
        updatedCustomer: updatedCustomer,
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

      console.error("Error updating customer.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while updating customer.",
      });
    }
  }

  async deleteCustomer(req: Request, res: Response): Promise<void> {
    const customerId: string = req.params.id;

    try {
      const customer = await customerService.getCustomer(customerId);
      if (!customer) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Customer not found for delete.",
        });
        return;
      }

      // AO CONSTRUIR RESERVA VERIFICAR SE O CLIENTE POSSUI ALGUMA RESERVA :::

      const deletedCustomer = await customerService.deleteCustomer(customerId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Customer deleted successfully.",
        deletedCustomer: deletedCustomer,
      });
    } catch (error) {
      console.error("Error deleting customer.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while deleting customer.",
      });
    }
  }
}

export const customerController = new CustomerController();
