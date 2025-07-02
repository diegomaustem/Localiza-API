import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";

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
      console.log("Next", user);
      // if (user === null) {
      //   res.status(404).json({
      //     code: 404,
      //     status: "error",
      //     message: "User not found.",
      //   });
      //   return;
      // }

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
      const userCreated = await userService.createUser(userData);

      console.log("Retorno", userCreated);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "User created successfully.",
        userCreated: userCreated,
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
          message: "User not found.",
        });
        return;
      }

      const updatedUser = await userService.updateUser(userId, userData);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "User updated successfully.",
        user: updatedUser,
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
          message: "User not found for deletion.",
        });
        return;
      }

      await userService.deleteUser(userId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "User deleted successfully.",
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
}

export const userController = new UserController();
