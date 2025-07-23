import Joi from "joi";

export const createReserveSchema = Joi.object({
  daily_amount: Joi.number().integer().min(0).required().messages({
    "number.base": "O valor diário deve ser um número.",
    "number.integer": "O valor diário deve ser um número inteiro.",
    "number.min": "O valor diário não pode ser negativo.",
    "any.required": "O valor diário é obrigatório.",
  }),

  withdrawn: Joi.date().iso().required().messages({
    "date.base": "A data de retirada deve ser uma data válida.",
    "date.iso":
      "A data de retirada deve estar no formato ISO 8601 (YYYY-MM-DD).",
    "any.required": "A data de retirada é obrigatória.",
  }),

  return: Joi.date().iso().required().min(Joi.ref("withdrawn")).messages({
    "date.base": "A data de devolução deve ser uma data válida.",
    "date.iso":
      "A data de devolução deve estar no formato ISO 8601 (YYYY-MM-DD).",
    "date.min": "A data de devolução não pode ser anterior à data de retirada.",
    "any.required": "A data de devolução é obrigatória.",
  }),

  value: Joi.number().precision(2).min(0).required().messages({
    "number.base": "O valor deve ser um número.",
    "number.precision": "O valor pode ter no máximo duas casas decimais.",
    "number.min": "O valor não pode ser negativo.",
    "any.required": "O valor é obrigatório.",
  }),

  status: Joi.string()
    .trim()
    .max(20)
    .valid("ativa", "pendente", "completa", "cancelada")
    .required()
    .messages({
      "string.base": "O status deve ser um texto.",
      "string.empty": "O status não pode estar vazio.",
      "string.max": "O status deve ter no máximo {#limit} caracteres.",
      "any.only": "Status inválido fornecido.",
      "any.required": "O status é obrigatório.",
    }),

  customers_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "O ID do cliente deve ser um texto.",
      "string.empty": "O ID do cliente não pode estar vazio.",
      "string.guid": "O ID do cliente deve ser um UUID válido.",
      "any.required": "O ID do cliente é obrigatório.",
    }),

  vehicles_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "O ID do veículo deve ser um texto.",
      "string.empty": "O ID do veículo não pode estar vazio.",
      "string.guid": "O ID do veículo deve ser um UUID válido.",
      "any.required": "O ID do veículo é obrigatório.",
    }),
});

export const updateReserveSchema = Joi.object({
  daily_amount: Joi.number().integer().min(0).messages({
    "number.base": "O valor diário deve ser um número.",
    "number.integer": "O valor diário deve ser um número inteiro.",
    "number.min": "O valor diário não pode ser negativo.",
  }),
  withdrawn: Joi.date().iso().messages({
    "date.base": "A data de retirada deve ser uma data válida.",
    "date.iso":
      "A data de retirada deve estar no formato ISO 8601 (YYYY-MM-DD).",
  }),
  return: Joi.date()
    .iso()
    .messages({
      "date.base": "A data de devolução deve ser uma data válida.",
      "date.iso":
        "A data de devolução deve estar no formato ISO 8601 (YYYY-MM-DD).",
      "date.min":
        "A data de devolução não pode ser anterior à data de retirada.",
    })
    .min(Joi.ref("withdrawn")),
  value: Joi.number().precision(2).min(0).messages({
    "number.base": "O valor deve ser um número.",
    "number.precision": "O valor pode ter no máximo duas casas decimais.",
    "number.min": "O valor não pode ser negativo.",
  }),
  status: Joi.string()
    .trim()
    .max(20)
    .valid("ativa", "pendente", "completa", "cancelada")
    .messages({
      "string.base": "O status deve ser um texto.",
      "string.empty": "O status não pode estar vazio.",
      "string.max": "O status deve ter no máximo {#limit} caracteres.",
      "any.only": "Status inválido fornecido.",
    }),
  customers_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .messages({
      "string.base": "O ID do cliente deve ser um texto.",
      "string.empty": "O ID do cliente não pode estar vazio.",
      "string.guid": "O ID do cliente deve ser um UUID válido.",
    }),

  vehicles_id: Joi.string()
    .trim()
    .guid({ version: ["uuidv4"] })
    .messages({
      "string.base": "O ID do veículo deve ser um texto.",
      "string.empty": "O ID do veículo não pode estar vazio.",
      "string.guid": "O ID do veículo deve ser um UUID válido.",
    }),
});
