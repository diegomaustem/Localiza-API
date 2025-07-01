import Joi from "joi";

export const createVehicleSchema = Joi.object({
  chassi: Joi.string()
    .trim()
    .length(17)
    .pattern(/^[A-HJ-NPR-Z0-9]{17}$/)
    .required()
    .messages({
      "string.base": "Chassis must be text.",
      "string.empty": "Chassis cannot be empty.",
      "string.length": "Chassis must have {#limit} characters.",
      "string.pattern.base":
        "Invalid chassis format. Check allowed characters.",
      "any.required": "Chassis is required.",
    }),
  placa: Joi.string().trim().min(7).max(8).required().messages({
    "string.base": "License Plate must be text.",
    "string.empty": "License Plate cannot be empty.",
    "string.min": "License Plate must have at least {#limit} characters.",
    "string.max": "License Plate must have at most {#limit} characters.",
    "any.required": "License Plate is required.",
  }),
  marca: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Brand must be text.",
    "string.empty": "Brand cannot be empty.",
    "string.min": "Brand must have at least {#limit} characters.",
    "string.max": "Brand must have at most {#limit} characters.",
    "any.required": "Brand is required.",
  }),
  modelo: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Model must be text.",
    "string.empty": "Model cannot be empty.",
    "string.min": "Model must have at least {#limit} characters.",
    "string.max": "Model must have at most {#limit} characters.",
    "any.required": "Model is required.",
  }),
  ano: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      "number.base": "Year must be a number.",
      "number.integer": "Year must be an integer.",
      "number.min": "Year must be greater than or equal to {#limit}.",
      "number.max": "Year cannot be too far in the future.",
      "any.required": "Year is required.",
    }),
  cor: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Color must be text.",
    "string.empty": "Color cannot be empty.",
    "string.min": "Color must have at least {#limit} characters.",
    "string.max": "Color must have at most {#limit} characters.",
    "any.required": "Color is required.",
  }),
  documento_crlv: Joi.string().trim().min(5).max(50).required().messages({
    "string.base": "CRLV Document must be text.",
    "string.empty": "CRLV Document cannot be empty.",
    "string.min": "CRLV Document must have at least {#limit} characters.",
    "string.max": "CRLV Document must have at most {#limit} characters.",
    "any.required": "CRLV Document is required.",
  }),
  cilindrada: Joi.number().integer().min(10).max(1000).required().messages({
    "number.base": "Engine displacement must be a number.",
    "number.integer": "Engine displacement must be an integer.",
    "number.min": "Engine displacement is below the minimum allowed value.",
    "number.max": "Engine displacement exceeds the maximum allowed value.",
    "any.required": "Engine displacement is required.",
  }),
});

export const updateVehicleSchema = Joi.object({
  chassi: Joi.string()
    .trim()
    .length(17)
    .pattern(/^[A-HJ-NPR-Z0-9]{17}$/),
  placa: Joi.string().trim().min(7).max(8),
  marca: Joi.string().trim().min(2).max(50),
  modelo: Joi.string().trim().min(2).max(100),
  ano: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  cor: Joi.string().trim().min(2).max(50),
  documento_crlv: Joi.string().trim().min(5).max(50),
  cilindrada: Joi.number().integer().min(10).max(1000),
}).min(1);
