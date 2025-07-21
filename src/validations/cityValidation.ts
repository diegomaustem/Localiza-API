import Joi from "joi";

export const createCitySchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).required().messages({
    "string.base": "O nome da cidade deve ser um texto.",
    "string.empty": "O nome da cidade não pode estar vazio.",
    "string.min": "O nome da cidade deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome da cidade pode ter no máximo {#limit} caracteres.",
    "any.required": "O nome da cidade é obrigatório.",
  }),
  states_id: Joi.string().guid().required().messages({
    "string.base": "O ID do estado deve ser um UUID válido.",
    "string.guid": "O ID do estado deve ser um UUID válido.",
    "string.empty": "O ID do estado não pode estar vazio.",
    "any.required": "O ID do estado é obrigatório.",
  }),
});

export const updateCitySchema = Joi.object({
  name: Joi.string().trim().min(2).max(45).messages({
    "string.base": "O nome da cidade deve ser um texto.",
    "string.empty": "O nome da cidade não pode estar vazio.",
    "string.min": "O nome da cidade deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome da cidade pode ter no máximo {#limit} caracteres.",
  }),
  states_id: Joi.string().guid().messages({
    "string.base": "O ID do estado deve ser um UUID válido.",
    "string.guid": "O ID do estado deve ser um UUID válido.",
    "string.empty": "O ID do estado não pode estar vazio.",
  }),
});
