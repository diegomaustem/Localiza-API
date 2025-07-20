import Joi from "joi";

export const createNationalitySchema = Joi.object({
  name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "A nacionalidade deve ser um texto.",
    "string.empty": "A nacionalidade não pode estar vazia.",
    "string.min": "A nacionalidade deve ter pelo menos {#limit} caracteres.",
    "string.max": "A nacionalidade deve ter no máximo {#limit} caracteres.",
    "any.required": "A nacionalidade é obrigatória.",
  }),
});

export const updateNationalitySchema = Joi.object({
  name: Joi.string().trim().min(3).max(45).messages({
    "string.base": "A nacionalidade deve ser um texto.",
    "string.empty": "A nacionalidade não pode estar vazia.",
    "string.min": "A nacionalidade deve ter pelo menos {#limit} caracteres.",
    "string.max": "A nacionalidade deve ter no máximo {#limit} caracteres.",
    "any.required": "A nacionalidade é obrigatória.",
  }),
});
