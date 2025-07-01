import Joi from "joi";

const LICENSE_TYPES = ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"];

export const createUserSchema = Joi.object({
  nome: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "First name must be text.",
    "string.empty": "First name cannot be empty.",
    "string.min": "First name must have at least {#limit} characters.",
    "string.max": "First name must have at most {#limit} characters.",
    "any.required": "First name is required.",
  }),
  sobrenome: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Last name must be text.",
    "string.empty": "Last name cannot be empty.",
    "string.min": "Last name must have at least {#limit} characters.",
    "string.max": "Last name must have at most {#limit} characters.",
    "any.required": "Last name is required.",
  }),
  cpf: Joi.string().length(11).pattern(/^\d+$/).required().messages({
    "string.base": "CPF must be text.",
    "string.empty": "CPF cannot be empty.",
    "string.length": "CPF must have {#limit} digits.",
    "string.pattern.base": "CPF must contain only numbers.",
    "any.required": "CPF is required.",
  }),
  rg: Joi.string().min(5).max(15).pattern(/^\d+$/).required().messages({
    "string.base": "RG must be text.",
    "string.empty": "RG cannot be empty.",
    "string.min": "RG must have at least {#limit} characters.",
    "string.max": "RG must have at most {#limit} characters.",
    "string.pattern.base": "RG must contain only numbers.",
    "any.required": "RG is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be text.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  senha: Joi.string().min(6).required().messages({
    "string.base": "Password must be text.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must have at least {#limit} characters.",
    "any.required": "Password is required.",
  }),
  endereco: Joi.string().trim().min(5).required().messages({
    "string.base": "Address must be text.",
    "string.empty": "Address cannot be empty.",
    "string.min": "Address must have at least {#limit} characters.",
    "any.required": "Address is required.",
  }),
  telefone: Joi.string().min(10).max(15).required().messages({
    "string.base": "Phone number must be text.",
    "string.empty": "Phone number cannot be empty.",
    "string.min": "Phone number must have at least {#limit} characters.",
    "string.max": "Phone number must have at most {#limit} characters.",
    "any.required": "Phone number is required.",
  }),
  numeroCarteira: Joi.string().pattern(/^\d+$/).required().messages({
    "string.base": "License number must be text.",
    "string.empty": "License number cannot be empty.",
    "string.pattern.base": "License number must contain only numbers.",
    "any.required": "License number is required.",
  }),
  tipoCarteira: Joi.string()
    .valid(...LICENSE_TYPES)
    .required()
    .messages({
      "string.base": "License type must be text.",
      "string.empty": "License type cannot be empty.",
      "any.only": "Invalid license type. Allowed values: {{#valids}}.",
      "any.required": "License type is required.",
    }),
});

export const updateUserSchema = Joi.object({
  nome: Joi.string().trim().min(3).max(50),
  sobrenome: Joi.string().trim().min(3).max(100),
  cpf: Joi.string().length(11).pattern(/^\d+$/),
  rg: Joi.string().min(5).max(15).pattern(/^\d+$/),
  email: Joi.string().email(),
  senha: Joi.string().min(6),
  endereco: Joi.string().trim().min(5),
  telefone: Joi.string().min(10).max(15),
  numeroCarteira: Joi.string().pattern(/^\d+$/),
  tipoCarteira: Joi.string().valid(...LICENSE_TYPES),
}).min(1);
