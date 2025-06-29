import { Request, Response } from "express";
import { ICreateUser, IUser, IUserResponse } from "../interfaces/IUser";
import { userService } from "../services/UserService";

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers();
      const usersToReturn =
        users.length === 0
          ? users
          : userController.parseUsersDataResponse(users);

      res
        .status(200)
        .json({ code: 200, status: "success", users: usersToReturn });
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
        user: userController.parseUsersDataResponse(user),
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
    const userData: ICreateUser = {
      ...req.body,
      cpf: BigInt(req.body.cpf),
      rg: BigInt(req.body.rg),
      numeroCarteira: BigInt(req.body.numeroCarteira),
    };

    try {
      const userCreated = await userService.createUser(userData);
      const userDataStr = userController.parseUsersDataResponse(userCreated);

      res.status(201).json({
        code: 201,
        status: "success",
        message: "User created successfully.",
        user: userDataStr,
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

  async deleteUser(req: Request, res: Response): Promise<void> {
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

      // Assuming there's a delete method in userService
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

  private parseUsersDataResponse(users: IUser[] | IUser): IUserResponse[] {
    const userList = Array.isArray(users) ? users : [users];

    return userList.map((user) => ({
      ...user,
      cpf: user.cpf.toString(),
      rg: user.rg.toString(),
      numeroCarteira: user.numeroCarteira.toString(),
    }));
  }
}

export const userController = new UserController();
