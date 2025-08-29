import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../interfaces/IUserLogin";
import { userService } from "../services/OLD-UserService";
import HttpError from "../errors/HttpError";

class AuthController {
  async login(req: Request, res: Response) {
    const dataUserLogin: IUserLogin = req.body;
    try {
      const foundUser = await userService.findUserForLogin(dataUserLogin);
      const isMatch = await bcrypt.compare(
        dataUserLogin.password,
        foundUser.password
      );

      if (!isMatch) {
        res.status(401).json({
          code: 401,
          status: "error",
          message: "Credenciais inválidas.",
        });
        return;
      }

      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) {
        throw new Error(
          "SECRET_KEY não foi definida nas variáveis de ambiente."
        );
      }

      const token = jwt.sign({ id: foundUser.id }, secretKey, {
        expiresIn: "2h",
      });

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário logado com sucesso.",
        loggedUser: {
          id: foundUser.id,
          name: foundUser.full_name,
          email: foundUser.email,
        },
        accessToken: token,
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

      console.error("Error in login process.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno no processo de login. Tente mais tarde.",
      });
    }
  }
}

export const authController = new AuthController();
