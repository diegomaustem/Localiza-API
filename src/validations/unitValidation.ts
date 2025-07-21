import Joi from "joi";

export const createUnitSchema = Joi.object({
  unit: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "O nome da unidade deve ser um texto.",
    "string.empty": "O nome da unidade não pode estar vazio.",
    "string.min": "O nome da unidade deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome da unidade pode ter no máximo {#limit} caracteres.",
    "any.required": "O nome da unidade é obrigatório.",
  }),
  cities_id: Joi.string().guid().required().messages({
    "string.base": "O ID da cidade deve ser um UUID válido.",
    "string.guid": "O ID da cidade deve ser um UUID válido.",
    "string.empty": "O ID da cidade não pode estar vazio.",
    "any.required": "O ID da cidade é obrigatório.",
  }),
});

export const updateUnitSchema = Joi.object({
  unit: Joi.string().trim().min(2).max(45).messages({
    "string.base": "O nome da unidade deve ser um texto.",
    "string.empty": "O nome da unidade não pode estar vazio.",
    "string.min": "O nome da unidade deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome da unidade pode ter no máximo {#limit} caracteres.",
  }),
  cities_id: Joi.string().guid().messages({
    "string.base": "O ID da cidade deve ser um UUID válido.",
    "string.guid": "O ID da cidade deve ser um UUID válido.",
    "string.empty": "O ID da cidade não pode estar vazio.",
  }),
});
