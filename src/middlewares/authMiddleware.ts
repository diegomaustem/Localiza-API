import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/IAuthRequest";
import jwt from "jsonwebtoken";

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    console.error("Erro de configuração: SECRET_KEY não definida no ambiente.");
    res.status(500).json({
      code: 500,
      status: "error",
      message:
        "Erro interno do servidor. Por favor, tente novamente mais tarde.",
    });
    return;
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      code: 401,
      status: "Unauthorized",
      message: "Token de autenticação ausente ou no formato incorreto.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      code: 401,
      status: "error",
      message: "Token inválido ou expirado.",
    });
    return;
  }
};
