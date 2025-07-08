import Joi from "joi";

export const createNationalitySchema = Joi.object({
  name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "Nationality must be text.",
    "string.empty": "Nationality cannot be empty.",
    "string.min": "Nationality must have at least {#limit} characters.",
    "string.max": "Nationality must have at most {#limit} characters.",
    "any.required": "Nationality is required.",
  }),
});

export const updateNationalitySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
});
