import Joi from "joi";

export const createGroupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "Group name must be text.",
    "string.empty": "Group name cannot be empty.",
    "string.min": "Group name must have at least {#limit} characters.",
    "string.max": "Group name can have at most {#limit} characters.",
    "any.required": "Group name is required.",
  }),
});

export const updateGroupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required(),
});
