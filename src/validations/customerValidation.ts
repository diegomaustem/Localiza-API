import Joi from "joi";

export const createCustomerSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "Full name must be text.",
    "string.empty": "Full name cannot be empty.",
    "string.min": "Full name must have at least {#limit} characters.",
    "string.max": "Full name must have at most {#limit} characters.",
    "any.required": "Full name is required.",
  }),

  cpf: Joi.string().trim().min(11).max(15).required().messages({
    "string.base": "CPF must be text.",
    "string.empty": "CPF cannot be empty.",
    "string.min": "CPF must have at least {#limit} characters.",
    "string.max": "CPF must have at most {#limit} characters.",
    "any.required": "CPF is required.",
  }),

  email: Joi.string().trim().email().max(45).required().messages({
    "string.base": "Email must be text.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email cannot be empty.",
    "string.max": "Email must have at most {#limit} characters.",
    "any.required": "Email is required.",
  }),

  gender: Joi.string().valid("M", "F", "NB", "O").required().messages({
    "any.only": "Gender must be one of: M, F, NB, or O.",
    "string.base": "Gender must be text.",
    "string.empty": "Gender cannot be empty.",
    "any.required": "Gender is required.",
  }),

  password: Joi.string().trim().min(6).max(200).required().messages({
    "string.base": "Password must be text.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must have at least {#limit} characters.",
    "string.max": "Password must have at most {#limit} characters.",
    "any.required": "Password is required.",
  }),

  points: Joi.number().integer().min(0).required().messages({
    "number.base": "Points must be a number.",
    "number.integer": "Points must be an integer.",
    "number.min": "Points must be zero or greater.",
    "any.required": "Points are required.",
  }),

  address: Joi.string().trim().min(3).max(65).required().messages({
    "string.base": "Address must be text.",
    "string.empty": "Address cannot be empty.",
    "string.min": "Address must have at least {#limit} characters.",
    "string.max": "Address must have at most {#limit} characters.",
    "any.required": "Address is required.",
  }),

  telephone: Joi.string().trim().min(8).max(16).required().messages({
    "string.base": "Telephone must be text.",
    "string.empty": "Telephone cannot be empty.",
    "string.min": "Telephone must have at least {#limit} characters.",
    "string.max": "Telephone must have at most {#limit} characters.",
    "any.required": "Telephone is required.",
  }),

  cnh_code: Joi.string().trim().min(5).max(25).required().messages({
    "string.base": "CNH code must be text.",
    "string.empty": "CNH code cannot be empty.",
    "string.min": "CNH code must have at least {#limit} characters.",
    "string.max": "CNH code must have at most {#limit} characters.",
    "any.required": "CNH code is required.",
  }),

  cnh_category: Joi.string().trim().min(1).max(6).required().messages({
    "string.base": "CNH category must be text.",
    "string.empty": "CNH category cannot be empty.",
    "string.min": "CNH category must have at least {#limit} characters.",
    "string.max": "CNH category must have at most {#limit} characters.",
    "any.required": "CNH category is required.",
  }),

  honors_id: Joi.string().guid().required().messages({
    "string.base": "Honors ID must be a valid UUID.",
    "string.guid": "Honors ID must be a valid UUID.",
    "string.empty": "Honors ID cannot be empty.",
    "any.required": "Honors ID is required.",
  }),

  nationalities_id: Joi.string().guid().required().messages({
    "string.base": "Nationalities ID must be a valid UUID.",
    "string.guid": "Nationalities ID must be a valid UUID.",
    "string.empty": "Nationalities ID cannot be empty.",
    "any.required": "Nationalities ID is required.",
  }),
});

export const updateCustomerSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(45).required(),
  cpf: Joi.string().trim().min(11).max(15).required(),
  email: Joi.string().trim().email().max(45).required(),
  gender: Joi.string().valid("M", "F", "NB", "O").required(),
  password: Joi.string().trim().min(6).max(200).required(),
  points: Joi.number().integer().min(0).required(),
  address: Joi.string().trim().min(3).max(65).required(),
  telephone: Joi.string().trim().min(8).max(16).required(),
  cnh_code: Joi.string().trim().min(5).max(25).required(),
  cnh_category: Joi.string().trim().min(1).max(6).required(),
  honors_id: Joi.string().guid().required(),
  nationalities_id: Joi.string().guid().required(),
});
