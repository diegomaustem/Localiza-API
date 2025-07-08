import Joi from "joi";
import { genericRepository } from "../repositories/GenericRepository";

export const createPrivilegeSchema = Joi.object({
  name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "Privilege must be text.",
    "string.empty": "Privilege cannot be empty.",
    "string.min": "Privilege must have at least {#limit} characters.",
    "string.max": "Privilege must have at most {#limit} characters.",
    "any.required": "Privilege is required.",
  }),
});

export const updatePrivilegeSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
});
