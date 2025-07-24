import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.base": "O email deve ser um texto.",
    "string.empty": "O email para login é obrigatório.",
    "string.email": "O email fornecido é inválido.",
    "any.required": "O email para login é obrigatório.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "A senha deve ser um texto.",
    "string.empty": "A senha para login é obrigatória.",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres.",
    "any.required": "A senha para login é obrigatória.",
  }),
});
