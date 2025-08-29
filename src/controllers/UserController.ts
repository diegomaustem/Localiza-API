import { Request, Response } from "express";
import { IUserService } from "../interfaces/User/IUserService";
import HttpError from "../errors/HttpError";

export class UserController {
  constructor(private readonly service: IUserService) {}

  listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.service.listUsers();
      res.status(200).json({ data: { users: users } });
    } catch (error) {
      console.error("[Controller] - Error fetching users.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        mensagem: "Internal error fetching users. Please try again later.",
      });
    }
  };

  listUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const user = await this.service.listUser(id);
      res.status(200).json({ data: { user: user } });
    } catch (error) {
      console.error("[Controller] - Failed to retrieve user.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while retrieving user. Try again later.",
      });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const newUser = await this.service.create(userData);
      res.status(201).json({
        message: "User created successfully.",
        data: { user: newUser },
      });
    } catch (error) {
      console.error("[Controller] - Failed to create user.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          mensagem: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while creating user. Try again later.",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const userData = req.body;
      const updatedUser = await this.service.update(id, userData);
      res.status(200).json({
        message: "User updated successfully.",
        data: { user: updatedUser },
      });
    } catch (error) {
      console.error("[Controller] - Failed to update user.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while updating user. Try again later.",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deletedUser = await this.service.delete(id);
      res.status(200).json({
        code: "User deleted successfully.",
        data: { user: deletedUser },
      });
    } catch (error) {
      console.error("[Controller] - Failed to delete user.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error while deleting user. Try again later.",
      });
    }
  };
}
