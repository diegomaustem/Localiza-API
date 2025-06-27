import { Request, Response } from "express";
import { ICreateUser, IUser, IUserResponse } from "../interfaces/IUser";
import { userService } from "../services/UserService";

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers();

      if (users.length === 0) {
        res
          .status(404)
          .json({ code: 404, status: "error", message: "No users found." });
        return;
      }
      const parsedUsers = this.parseUsersDataResponse(users);

      res
        .status(200)
        .json({ code: 200, status: "success", users: parsedUsers });
    } catch (error) {
      console.error("Error getting users.", error);
      throw error;
    }
  }

  private parseUsersDataResponse(users: IUser[]): IUserResponse[] {
    return users.map((user) => ({
      ...user,
      cpf: user.cpf.toString(),
      rg: user.rg.toString(),
      numeroCarteira: user.numeroCarteira.toString(),
    }));
  }
}

export const userController = new UserController();
