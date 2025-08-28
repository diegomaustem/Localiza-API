import Joi from "joi";

export const schemaCreateUser = Joi.object({
  full_name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "full_name must be a text.",
    "string.empty": "full_name cannot be empty.",
    "string.min": "full_name must have at least {#limit} characters.",
    "string.max": "full_name must not exceed {#limit} characters.",
    "any.required": "full_name is required.",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.base": "Email must be a text.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  address: Joi.string().trim().min(3).max(65).required().messages({
    "string.base": "Address must be a text.",
    "string.empty": "Address cannot be empty.",
    "string.min": "Address must have at least {#limit} characters.",
    "any.required": "Address is required.",
  }),
  gender: Joi.string().trim().min(1).max(1).required().messages({
    "string.base": "Gender must be a text.",
    "string.empty": "Gender cannot be empty.",
    "string.min": "Gender must have at least {#limit} character.",
    "string.max": "Gender cannot exceed {#limit} characters.",
    "any.required": "Gender is required.",
  }),
  telephone: Joi.string().trim().min(10).max(16).required().messages({
    "string.base": "Telephone must be a text.",
    "string.empty": "Telephone cannot be empty.",
    "string.min": "Telephone must have at least {#limit} characters.",
    "string.max": "Telephone cannot exceed {#limit} characters.",
    "any.required": "Telephone is required.",
  }),
  password: Joi.string().trim().min(6).max(200).required().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must have at least {#limit} characters.",
    "any.required": "Password is required.",
  }),
  IdPrivileges: Joi.string().trim().guid().required().messages({
    "string.base": "IdPrivileges must be a text.",
    "string.guid": "IdPrivileges must be a valid UUID.",
    "string.empty": "IdPrivileges cannot be empty.",
    "any.required": "IdPrivileges is required.",
  }),
  IdStatusUsers: Joi.string().trim().guid().required().messages({
    "string.base": "IdStatusUsers must be a text.",
    "string.guid": "IdStatusUsers must be a valid UUID.",
    "string.empty": "IdStatusUsers cannot be empty.",
    "any.required": "IdStatusUsers is required.",
  }),
});

export const schemaUpdateUser = Joi.object({
  full_name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .messages({
      "string.base": "full_name must be a text.",
      "string.empty": "full_name cannot be empty.",
      "string.min": "full_name must have at least {#limit} characters.",
      "string.max": "full_name must not exceed {#limit} characters.",
    })
    .allow(null)
    .optional(),

  email: Joi.string()
    .trim()
    .email()
    .messages({
      "string.base": "Email must be a text.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Invalid email format.",
    })
    .allow(null)
    .optional(),

  address: Joi.string().trim().min(5).messages({
    "string.base": "O address deve ser um texto.",
    "string.empty": "O address não pode estar vazio.",
    "string.min": "O address deve ter pelo menos {#limit} caracteres.",
  }),

  gender: Joi.string()
    .trim()
    .min(1)
    .max(1)
    .messages({
      "string.base": "Gender must be a text.",
      "string.empty": "Gender cannot be empty.",
      "string.min": "Gender must have at least {#limit} character.",
      "string.max": "Gender cannot exceed {#limit} characters.",
    })
    .allow(null)
    .optional(),

  telephone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .messages({
      "string.base": "Telephone must be a text.",
      "string.empty": "Telephone cannot be empty.",
      "string.min": "Telephone must have at least {#limit} characters.",
      "string.max": "Telephone cannot exceed {#limit} characters.",
    })
    .allow(null)
    .optional(),

  password: Joi.string()
    .trim()
    .min(6)
    .messages({
      "string.base": "Password must be a text.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must have at least {#limit} characters.",
    })
    .allow(null)
    .optional(),

  IdPrivileges: Joi.string()
    .trim()
    .guid()
    .messages({
      "string.base": "IdPrivileges must be a text.",
      "string.guid": "IdPrivileges must be a valid UUID.",
      "string.empty": "IdPrivileges cannot be empty.",
    })
    .allow(null)
    .optional(),

  IdStatusUsers: Joi.string()
    .trim()
    .guid()
    .messages({
      "string.base": "IdStatusUsers must be a text.",
      "string.guid": "IdStatusUsers must be a valid UUID.",
      "string.empty": "IdStatusUsers cannot be empty.",
    })
    .allow(null)
    .optional(),
});
