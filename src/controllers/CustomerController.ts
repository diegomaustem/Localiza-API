import { Request, Response } from "express";
import { customerService } from "../services/CustomerService";
import { ICustomer } from "../interfaces/ICustomer";
import { ValidPrismaTable } from "../types/PrismaTables";
import { genericRepository } from "../repositories/GenericRepository";
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
      if (customer === null) {
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
      const hasNationality = await customerController.getHasNationality(
        customerData.nationalities_id
      );
      if (!hasNationality) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Nationality not found. Enter a valid one.",
        });
        return;
      }

      const hasHonor = await customerController.getHasHonor(
        customerData.honors_id
      );
      if (!hasHonor) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Honor not found. Enter a valid one.",
        });
        return;
      }

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

      const hasNationality = await customerController.getHasNationality(
        customerData.nationalities_id
      );
      if (!hasNationality) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Nationality not found. Enter a valid one.",
        });
        return;
      }

      const hasHonor = await customerController.getHasHonor(
        customerData.honors_id
      );
      if (!hasHonor) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Honor not found. Enter a valid one.",
        });
        return;
      }

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
      console.error("Error updating customer.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while updating customer.",
      });
    }
  }

  private getHasNationality(nationalityId: string): Promise<boolean> {
    const table: ValidPrismaTable = "nationalities";
    const field = "id";
    const value = nationalityId;

    return genericRepository.generateQuery(table, field, value);
  }

  private getHasHonor(honorId: string): Promise<boolean> {
    const table: ValidPrismaTable = "honors";
    const field = "id";
    const value = honorId;

    return genericRepository.generateQuery(table, field, value);
  }
}

export const customerController = new CustomerController();
