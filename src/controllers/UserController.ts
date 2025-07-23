import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";
import HttpError from "../errors/HttpError";
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
        message: "Erro interno ao buscar usuários. Tente mais tarde.",
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
          message: "Usuário não encontrado.",
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
        message: "Erro interno ao procurar usuário. Tente mais tarde.",
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const userData: IUser = req.body;
    try {
      await userService.userRulesValidation(userData);

      const createdUser = await userService.createUser(userData);
      res.status(201).json({
        code: 201,
        status: "success",
        message: "Usuário criado com sucesso.",
        createdUser: createdUser,
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

      console.error("Error creating user.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao criar usuário. Tente mais tarde.",
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
          message: "Usuário não encontrado para atualizar.",
        });
        return;
      }

      await userService.userRulesValidation(userData);

      const updatedUser = await userService.updateUser(userId, userData);
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário atualizado com sucesso.",
        updatedUser: updatedUser,
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

      console.error("Error updating user.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao atualizar usuário.",
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
          message: "Usuário não encontrado para exclusão.",
        });
        return;
      }

      const deletedUser = await userService.deleteUser(userId);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário excluído com sucesso.",
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
}

export const userController = new UserController();
