import Joi from "joi";

export const createCitySchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "City name must be text.",
    "string.empty": "City name cannot be empty.",
    "string.min": "City name must have at least {#limit} characters.",
    "string.max": "City name can have at most {#limit} characters.",
    "any.required": "City name is required.",
  }),
  states_id: Joi.string().guid().required().messages({
    "string.base": "States ID must be a valid UUID.",
    "string.guid": "States ID must be a valid UUID.",
    "string.empty": "States ID cannot be empty.",
    "any.required": "States ID is required.",
  }),
});

export const updateCitySchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required(),
  states_id: Joi.string().guid().required(),
});
