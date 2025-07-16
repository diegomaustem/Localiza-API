import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "Category name must be text.",
    "string.empty": "Category name cannot be empty.",
    "string.min": "Category name must have at least {#limit} characters.",
    "string.max": "Category name can have at most {#limit} characters.",
    "any.required": "Category name is required.",
  }),
  value: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Value must be a number.",
    "number.precision": "Value can have at most {#limit} decimal places.",
    "number.min": "Value cannot be a negative value.",
    "any.required": "Value is required.",
  }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required(),
  value: Joi.number().precision(2).min(0).required(),
});
