import Joi from "joi";

export const createUnitSchema = Joi.object({
  unit: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "Unit name must be text.",
    "string.empty": "Unit name cannot be empty.",
    "string.min": "Unit name must have at least {#limit} characters.",
    "string.max": "Unit name can have at most {#limit} characters.",
    "any.required": "Unit name is required.",
  }),
  cities_id: Joi.string().guid().required().messages({
    "string.base": "Cities ID must be a valid UUID.",
    "string.guid": "Cities ID must be a valid UUID.",
    "string.empty": "Cities ID cannot be empty.",
    "any.required": "Cities ID is required.",
  }),
});

export const updateUnitSchema = Joi.object({
  unit: Joi.string().trim().min(2).max(45).required(),
  cities_id: Joi.string().guid().required(),
});
