import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type ValidationSource = "body" | "query" | "params";

export const validate =
  (schema: Joi.ObjectSchema, source: ValidationSource = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
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
        message: "Input data validation failed.",
        errors: errors,
      });

      return;
    }

    next();
  };
