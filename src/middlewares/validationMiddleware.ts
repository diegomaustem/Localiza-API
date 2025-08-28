import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type ValidationSource = "body" | "query" | "params";

export const validate =
  (schema: Joi.ObjectSchema, source: ValidationSource = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source], {
        abortEarly: false,
        allowUnknown: false,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join("."),
          problem: detail.message.replace(/['"]/g, ""),
        }));

        res.status(400).json({
          message: "Input data validation failed.",
          errors: errors,
        });
        return;
      }
      next();
    } catch (error) {
      console.error("[Middleware] - Validation middleware error.", error);
      res.status(500).json({
        message: "Internal validation processing error.",
      });
      return;
    }
  };
