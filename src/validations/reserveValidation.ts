import Joi from "joi";

export const createReserveSchema = Joi.object({
  daily_amount: Joi.number().integer().min(0).required().messages({
    "number.base": "Daily amount must be a number.",
    "number.integer": "Daily amount must be an integer.",
    "number.min": "Daily amount cannot be negative.",
    "any.required": "Daily amount is required.",
  }),

  withdrawn: Joi.date().iso().required().messages({
    "date.base": "Withdrawn date must be a valid date.",
    "date.iso": "Withdrawn date must be in ISO 8601 format (YYYY-MM-DD).",
    "any.required": "Withdrawn date is required.",
  }),

  return: Joi.date().iso().required().min(Joi.ref("withdrawn")).messages({
    "date.base": "Return date must be a valid date.",
    "date.iso": "Return date must be in ISO 8601 format (YYYY-MM-DD).",
    "date.min": "Return date cannot be before the withdrawn date.",
    "any.required": "Return date is required.",
  }),

  value: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Value must be a number.",
    "number.precision": "Value can only have two decimal places.",
    "number.min": "Value cannot be negative.",
    "any.required": "Value is required.",
  }),

  status: Joi.string()
    .trim()
    .max(20)
    .valid("active", "pending", "completed", "canceled")
    .required()
    .messages({
      "string.base": "Status must be text.",
      "string.empty": "Status cannot be empty.",
      "string.max": "Status must have at most {#limit} characters.",
      "any.only": "Invalid status provided.",
      "any.required": "Status is required.",
    }),

  customers_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "Customer ID must be text.",
      "string.empty": "Customer ID cannot be empty.",
      "string.guid": "Customer ID must be a valid UUID.",
      "any.required": "Customer ID is required.",
    }),

  vehicles_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "Vehicle ID must be text.",
      "string.empty": "Vehicle ID cannot be empty.",
      "string.guid": "Vehicle ID must be a valid UUID.",
      "any.required": "Vehicle ID is required.",
    }),
});

export const updateReserveSchema = Joi.object({
  daily_amount: Joi.number().integer().min(0).required(),
  withdrawn: Joi.date().iso().required(),
  return: Joi.date().iso().required().min(Joi.ref("withdrawn")),
  value: Joi.number().precision(2).min(0).required(),
  status: Joi.string()
    .trim()
    .max(20)
    .valid("active", "pending", "completed", "canceled")
    .required(),
  customers_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .required(),

  vehicles_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .required(),
});
