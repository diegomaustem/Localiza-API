import Joi from "joi";

export const createStateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "State name must be text.",
    "string.empty": "State name cannot be empty.",
    "string.min": "State name must have at least {#limit} characters.",
    "string.max": "State name can have at most {#limit} characters.",
    "any.required": "State name is required.",
  }),
});

export const updateStateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required(),
});
