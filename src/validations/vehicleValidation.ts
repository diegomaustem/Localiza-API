import Joi from "joi";

export const createVehicleSchema = Joi.object({
  chassi: Joi.string()
    .trim()
    .length(17)
    .pattern(/^[A-HJ-NPR-Z0-9]{17}$/)
    .required()
    .messages({
      "string.base": "O chassi deve ser um texto.",
      "string.empty": "O chassi não pode estar vazio.",
      "string.length": "O chassi deve ter exatamente {#limit} caracteres.",
      "string.pattern.base":
        "Formato de chassi inválido. Verifique os caracteres permitidos.",
      "any.required": "O chassi é obrigatório.",
    }),

  plate: Joi.string().trim().min(7).max(45).required().messages({
    "string.base": "A placa deve ser um texto.",
    "string.empty": "A placa não pode estar vazia.",
    "string.min": "A placa deve ter pelo menos {#limit} caracteres.",
    "string.max": "A placa deve ter no máximo {#limit} caracteres.",
    "any.required": "A placa é obrigatória.",
  }),

  mark: Joi.string().trim().min(2).max(30).required().messages({
    "string.base": "A marca deve ser um texto.",
    "string.empty": "A marca não pode estar vazia.",
    "string.min": "A marca deve ter pelo menos {#limit} caracteres.",
    "string.max": "A marca deve ter no máximo {#limit} caracteres.",
    "any.required": "A marca é obrigatória.",
  }),

  model: Joi.string().trim().min(2).max(20).required().messages({
    "string.base": "O modelo deve ser um texto.",
    "string.empty": "O modelo não pode estar vazio.",
    "string.min": "O modelo deve ter pelo menos {#limit} caracteres.",
    "string.max": "O modelo deve ter no máximo {#limit} caracteres.",
    "any.required": "O modelo é obrigatório.",
  }),

  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      "number.base": "O ano deve ser um número.",
      "number.integer": "O ano deve ser um número inteiro.",
      "number.min": "O ano deve ser no mínimo {#limit}.",
      "number.max": "O ano não pode estar muito distante no futuro.",
      "any.required": "O ano é obrigatório.",
    }),

  color: Joi.string().trim().min(2).max(20).required().messages({
    "string.base": "A cor deve ser um texto.",
    "string.empty": "A cor não pode estar vazia.",
    "string.min": "A cor deve ter pelo menos {#limit} caracteres.",
    "string.max": "A cor deve ter no máximo {#limit} caracteres.",
    "any.required": "A cor é obrigatória.",
  }),

  crlv_document: Joi.string().trim().min(5).max(45).required().messages({
    "string.base": "O CRLV deve ser um texto.",
    "string.empty": "O CRLV não pode estar vazio.",
    "string.min": "O CRLV deve ter pelo menos {#limit} caracteres.",
    "string.max": "O CRLV deve ter no máximo {#limit} caracteres.",
    "any.required": "O CRLV é obrigatório.",
  }),

  cylinder_capacity: Joi.number()
    .integer()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "number.base": "A cilindrada deve ser um número.",
      "number.integer": "A cilindrada deve ser um número inteiro.",
      "number.min": "A cilindrada está abaixo do valor mínimo permitido.",
      "number.max": "A cilindrada excede o valor máximo permitido.",
      "any.required": "A cilindrada é obrigatória.",
    }),

  status: Joi.string()
    .valid("disponível", "indisponível")
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.base": "O status deve ser um texto.",
      "string.empty": "O status não pode estar vazio.",
      "any.only":
        "Status inválido. Valores permitidos: disponível, indisponível, em manutenção, alugado.",
      "any.required": "O status é obrigatório.",
    }),

  units_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "O ID da unidade deve ser um texto.",
      "string.guid": "O ID da unidade deve ser um UUID válido.",
      "string.empty": "O ID da unidade não pode estar vazio.",
      "any.required": "O ID da unidade é obrigatório.",
    }),

  categories_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "O ID da categoria deve ser um texto.",
      "string.guid": "O ID da categoria deve ser um UUID válido.",
      "string.empty": "O ID da categoria não pode estar vazio.",
      "any.required": "O ID da categoria é obrigatório.",
    }),

  groups_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.base": "O ID do grupo deve ser um texto.",
      "string.guid": "O ID do grupo deve ser um UUID válido.",
      "string.empty": "O ID do grupo não pode estar vazio.",
      "any.required": "O ID do grupo é obrigatório.",
    }),
});

export const updateVehicleSchema = Joi.object({
  chassi: Joi.string()
    .trim()
    .length(17)
    .pattern(/^[A-HJ-NPR-Z0-9]{17}$/)
    .messages({
      "string.base": "O chassi deve ser um texto.",
      "string.empty": "O chassi não pode estar vazio.",
      "string.length": "O chassi deve ter exatamente {#limit} caracteres.",
      "string.pattern.base":
        "Formato de chassi inválido. Verifique os caracteres permitidos.",
    }),

  plate: Joi.string().trim().min(7).max(45).messages({
    "string.base": "A placa deve ser um texto.",
    "string.empty": "A placa não pode estar vazia.",
    "string.min": "A placa deve ter pelo menos {#limit} caracteres.",
    "string.max": "A placa deve ter no máximo {#limit} caracteres.",
  }),

  mark: Joi.string().trim().min(2).max(30).messages({
    "string.base": "A marca deve ser um texto.",
    "string.empty": "A marca não pode estar vazia.",
    "string.min": "A marca deve ter pelo menos {#limit} caracteres.",
    "string.max": "A marca deve ter no máximo {#limit} caracteres.",
  }),

  model: Joi.string().trim().min(2).max(20).messages({
    "string.base": "O modelo deve ser um texto.",
    "string.empty": "O modelo não pode estar vazio.",
    "string.min": "O modelo deve ter pelo menos {#limit} caracteres.",
    "string.max": "O modelo deve ter no máximo {#limit} caracteres.",
  }),

  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .messages({
      "number.base": "O ano deve ser um número.",
      "number.integer": "O ano deve ser um número inteiro.",
      "number.min": "O ano deve ser no mínimo {#limit}.",
      "number.max": "O ano não pode estar muito distante no futuro.",
    }),

  color: Joi.string().trim().min(2).max(20).messages({
    "string.base": "A cor deve ser um texto.",
    "string.empty": "A cor não pode estar vazia.",
    "string.min": "A cor deve ter pelo menos {#limit} caracteres.",
    "string.max": "A cor deve ter no máximo {#limit} caracteres.",
  }),

  crlv_document: Joi.string().trim().min(5).max(45).messages({
    "string.base": "O CRLV deve ser um texto.",
    "string.empty": "O CRLV não pode estar vazio.",
    "string.min": "O CRLV deve ter pelo menos {#limit} caracteres.",
    "string.max": "O CRLV deve ter no máximo {#limit} caracteres.",
  }),

  cylinder_capacity: Joi.number().integer().min(10).max(1000).messages({
    "number.base": "A cilindrada deve ser um número.",
    "number.integer": "A cilindrada deve ser um número inteiro.",
    "number.min": "A cilindrada está abaixo do valor mínimo permitido.",
    "number.max": "A cilindrada excede o valor máximo permitido.",
  }),

  status: Joi.string()
    .valid("disponível", "indisponível")
    .min(3)
    .max(20)
    .messages({
      "string.base": "O status deve ser um texto.",
      "string.empty": "O status não pode estar vazio.",
      "any.only":
        "Status inválido. Valores permitidos: disponível, indisponível.",
    }),

  units_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .messages({
      "string.base": "O ID da unidade deve ser um texto.",
      "string.guid": "O ID da unidade deve ser um UUID válido.",
      "string.empty": "O ID da unidade não pode estar vazio.",
    }),

  categories_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .messages({
      "string.base": "O ID da categoria deve ser um texto.",
      "string.guid": "O ID da categoria deve ser um UUID válido.",
      "string.empty": "O ID da categoria não pode estar vazio.",
    }),

  groups_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .messages({
      "string.base": "O ID do grupo deve ser um texto.",
      "string.guid": "O ID do grupo deve ser um UUID válido.",
      "string.empty": "O ID do grupo não pode estar vazio.",
    }),
})
  .min(1)
  .messages({
    "object.min": "Pelo menos um campo deve ser informado para atualização.",
  });
