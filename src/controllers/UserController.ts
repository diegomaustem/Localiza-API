import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";
import { ValidPrismaTable } from "../types/PrismaTables";
import { genericRepository } from "../repositories/GenericRepository";

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers();
      res.status(200).json({ code: 200, status: "success", users: users });
    } catch (error) {
      console.error("Error getting users.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for users.",
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;

    try {
      const user = await userService.getUser(userId);

      if (!user) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "User not found.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        user: user,
      });
    } catch (error) {
      console.error("Error getting user.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while searching for user.",
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const userData: IUser = req.body;

    try {
      const existEmail = await userController.getHasEmail(userData.email);
      if (existEmail) {
        res.status(409).json({
          code: 409,
          status: "conflict",
          message:
            "The email address you provided is already in our records. Please try another one.",
        });
        return;
      }

      const existPrivilege = await userController.getHasPrivilege(
        userData.privileges_id
      );
      if (!existPrivilege) {
        res.status(404).json({
          code: 404,
          status: "error",
          message:
            "The reported privilege does not exist.Report a valid privilege.",
        });
        return;
      }

      const createdUser = await userService.createUser(userData);
      res.status(201).json({
        code: 201,
        status: "success",
        message: "User created successfully.",
        createdUser: createdUser,
      });
    } catch (error) {
      console.error("Error creating user.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating user.",
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const userData: IUser = req.body;

    try {
      const user = await userService.getUser(userId);
      if (!user) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "User not found for update.",
        });
        return;
      }

      const existEmail = await userController.getHasEmail(userData.email);
      if (existEmail) {
        res.status(409).json({
          code: 409,
          status: "conflict",
          message:
            "The email address you provided is already in our records. Please try another one.",
        });
        return;
      }

      const existPrivilege = await userController.getHasPrivilege(
        userData.privileges_id
      );
      if (!existPrivilege) {
        res.status(404).json({
          code: 404,
          status: "error",
          message:
            "The reported privilege does not exist.Report a valid privilege.",
        });
        return;
      }

      const updatedUser = await userService.updateUser(userId, userData);
      res.status(200).json({
        code: 200,
        status: "success",
        message: "User updated successfully.",
        updatedUser: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while updating user.",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;

    try {
      const user = await userService.getUser(userId);
      if (!user) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "User not found for delete.",
        });
        return;
      }

      const deletedUser = await userService.deleteUser(userId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "User deleted successfully.",
        deletedUser: deletedUser,
      });
    } catch (error) {
      console.error("Error deleting user.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while deleting user.",
      });
    }
  }

  private getHasPrivilege(privilegeId: string): Promise<boolean> {
    const table: ValidPrismaTable = "privileges";
    const field = "id";
    const value = privilegeId;

    return genericRepository.generateQuery(table, field, value);
  }

  private getHasEmail(email: string): Promise<boolean> {
    const table: ValidPrismaTable = "users";
    const field = "email";
    const value = email;

    return genericRepository.generateQuery(table, field, value);
  }
}

export const userController = new UserController();
