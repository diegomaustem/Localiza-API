import Joi from "joi";

export const createHonorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "Name must be text.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must have at least {#limit} characters.",
    "string.max": "Name must have at most {#limit} characters.",
    "any.required": "Name is required.",
  }),
  level: Joi.number().strict().integer().min(1).max(45).required().messages({
    "number.base": "Level must be a number.",
    "number.integer": "Level must be an integer.",
    "number.min": "Level must be at least 1.",
    "number.max": "Level must be at most 15.",
    "any.required": "Level is required.",
  }),
});

export const updateHonorSchema = Joi.object({
  name: Joi.string().trim().min(1).max(15).required(),
  level: Joi.number().strict().integer().min(1).max(15).required(),
});
