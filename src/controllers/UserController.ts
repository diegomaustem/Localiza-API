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
