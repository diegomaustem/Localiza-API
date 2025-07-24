import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type ValidationSource = "body" | "query" | "params";

export const validate =
  (schema: Joi.ObjectSchema, source: ValidationSource = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const hasDataEntry = Object.values(req[source]).some((value) => {
      if (value !== null && value !== undefined) {
        if (typeof value === "string") {
          return value.trim() !== "";
        }
        return true;
      }
      return false;
    });

    if (!hasDataEntry) {
      res.status(400).json({
        code: 400,
        status: "error",
        message: "Não é permitido que todos os campos sejam vazios.",
      });
      return;
    }

    const { error } = schema.validate(req[source], {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/['"]/g, ""),
      }));

      res.status(400).json({
        code: 400,
        message: "Falha na validação dos dados de entrada.",
        errors: errors,
      });

      return;
    }

    next();
  };
