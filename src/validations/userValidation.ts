import Joi from "joi";

export const createUserSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Full name must be text.",
    "string.empty": "Full name cannot be empty.",
    "string.min": "Full name must have at least {#limit} characters.",
    "string.max": "Full name must have at most {#limit} characters.",
    "any.required": "Full name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be text.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  address: Joi.string().trim().min(5).required().messages({
    "string.base": "Address must be text.",
    "string.empty": "Address cannot be empty.",
    "string.min": "Address must have at least {#limit} characters.",
    "any.required": "Address is required.",
  }),
  gender: Joi.string().trim().min(1).max(1).required().messages({
    "string.base": "Gender must be text.",
    "string.empty": "Gender cannot be empty.",
    "string.min": "Gender must have at least {#limit} character.",
    "string.max": "Gender must have at most {#limit} character.",
    "any.required": "Gender is required.",
  }),
  telephone: Joi.string().min(10).max(16).required().messages({
    "string.base": "Phone number must be text.",
    "string.empty": "Phone number cannot be empty.",
    "string.min": "Phone number must have at least {#limit} characters.",
    "string.max": "Phone number must have at most {#limit} characters.",
    "any.required": "Phone number is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be text.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must have at least {#limit} characters.",
    "any.required": "Password is required.",
  }),
  privileges_id: Joi.string().required().messages({
    "string.base": "Privilege ID must be text.",
    "string.empty": "Privilege ID cannot be empty.",
    "any.required": "Privilege ID is required.",
  }),
  status_users_id: Joi.string().required().messages({
    "string.base": "Status user ID must be text.",
    "string.empty": "Status user ID cannot be empty.",
    "any.required": "Status user ID is required.",
  }),
});

export const updateUserSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(100),
  email: Joi.string().email(),
  address: Joi.string().trim().min(5),
  gender: Joi.string().trim().min(1).max(1),
  telephone: Joi.string().min(10).max(15),
  password: Joi.string().min(6),
  privilege_id: Joi.string(),
  status_users_id: Joi.string(),
});
