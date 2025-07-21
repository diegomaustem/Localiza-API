import Joi from "joi";

export const createCustomerSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "O nome completo deve ser um texto.",
    "string.empty": "O nome completo não pode estar vazio.",
    "string.min": "O nome completo deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome completo deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome completo é obrigatório.",
  }),

  cpf: Joi.string().trim().min(11).max(15).required().messages({
    "string.base": "O CPF deve ser um texto.",
    "string.empty": "O CPF não pode estar vazio.",
    "string.min": "O CPF deve ter pelo menos {#limit} caracteres.",
    "string.max": "O CPF deve ter no máximo {#limit} caracteres.",
    "any.required": "O CPF é obrigatório.",
  }),

  email: Joi.string().trim().email().max(45).required().messages({
    "string.base": "O e-mail deve ser um texto.",
    "string.email": "O e-mail deve ser um endereço de e-mail válido.",
    "string.empty": "O e-mail não pode estar vazio.",
    "string.max": "O e-mail deve ter no máximo {#limit} caracteres.",
    "any.required": "O e-mail é obrigatório.",
  }),

  gender: Joi.string().valid("M", "F", "NB", "O").required().messages({
    "any.only": "O gênero deve ser um dos seguintes: M, F, NB ou O.",
    "string.base": "O gênero deve ser um texto.",
    "string.empty": "O gênero não pode estar vazio.",
    "any.required": "O gênero é obrigatório.",
  }),

  password: Joi.string().trim().min(6).max(200).required().messages({
    "string.base": "A senha deve ser um texto.",
    "string.empty": "A senha não pode estar vazia.",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres.",
    "string.max": "A senha deve ter no máximo {#limit} caracteres.",
    "any.required": "A senha é obrigatória.",
  }),

  points: Joi.number().integer().min(0).required().messages({
    "number.base": "Os pontos devem ser um número.",
    "number.integer": "Os pontos devem ser um número inteiro.",
    "number.min": "Os pontos devem ser zero ou maior.",
    "any.required": "Os pontos são obrigatórios.",
  }),

  address: Joi.string().trim().min(3).max(65).required().messages({
    "string.base": "O endereço deve ser um texto.",
    "string.empty": "O endereço não pode estar vazio.",
    "string.min": "O endereço deve ter pelo menos {#limit} caracteres.",
    "string.max": "O endereço deve ter no máximo {#limit} caracteres.",
    "any.required": "O endereço é obrigatório.",
  }),

  telephone: Joi.string().trim().min(8).max(16).required().messages({
    "string.base": "O telefone deve ser um texto.",
    "string.empty": "O telefone não pode estar vazio.",
    "string.min": "O telefone deve ter pelo menos {#limit} caracteres.",
    "string.max": "O telefone deve ter no máximo {#limit} caracteres.",
    "any.required": "O telefone é obrigatório.",
  }),

  cnh_code: Joi.string().trim().min(5).max(25).required().messages({
    "string.base": "O código CNH deve ser um texto.",
    "string.empty": "O código CNH não pode estar vazio.",
    "string.min": "O código CNH deve ter pelo menos {#limit} caracteres.",
    "string.max": "O código CNH deve ter no máximo {#limit} caracteres.",
    "any.required": "O código CNH é obrigatório.",
  }),

  cnh_category: Joi.string().trim().min(1).max(6).required().messages({
    "string.base": "A categoria CNH deve ser um texto.",
    "string.empty": "A categoria CNH não pode estar vazia.",
    "string.min": "A categoria CNH deve ter pelo menos {#limit} caracteres.",
    "string.max": "A categoria CNH deve ter no máximo {#limit} caracteres.",
    "any.required": "A categoria CNH é obrigatória.",
  }),

  honors_id: Joi.string().guid().required().messages({
    "string.base": "O ID de honrarias deve ser um UUID válido.",
    "string.guid": "O ID de honrarias deve ser um UUID válido.",
    "string.empty": "O ID de honrarias não pode estar vazio.",
    "any.required": "O ID de honrarias é obrigatório.",
  }),

  nationalities_id: Joi.string().guid().required().messages({
    "string.base": "O ID da nacionalidade deve ser um UUID válido.",
    "string.guid": "O ID da nacionalidade deve ser um UUID válido.",
    "string.empty": "O ID da nacionalidade não pode estar vazio.",
    "any.required": "O ID da nacionalidade é obrigatório.",
  }),
});

export const updateCustomerSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(45).messages({
    "string.base": "O nome completo deve ser um texto.",
    "string.empty": "O nome completo não pode estar vazio.",
    "string.min": "O nome completo deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome completo deve ter no máximo {#limit} caracteres.",
  }),
  cpf: Joi.string().trim().min(11).max(15).messages({
    "string.base": "O CPF deve ser um texto.",
    "string.empty": "O CPF não pode estar vazio.",
    "string.min": "O CPF deve ter pelo menos {#limit} caracteres.",
    "string.max": "O CPF deve ter no máximo {#limit} caracteres.",
  }),
  email: Joi.string().trim().email().max(45).messages({
    "string.base": "O e-mail deve ser um texto.",
    "string.email": "O e-mail deve ser um endereço de e-mail válido.",
    "string.empty": "O e-mail não pode estar vazio.",
    "string.max": "O e-mail deve ter no máximo {#limit} caracteres.",
  }),
  gender: Joi.string().valid("M", "F", "NB", "O").messages({
    "any.only": "O gênero deve ser um dos seguintes: M, F, NB ou O.",
    "string.base": "O gênero deve ser um texto.",
    "string.empty": "O gênero não pode estar vazio.",
  }),
  password: Joi.string().trim().min(6).max(200).messages({
    "string.base": "A senha deve ser um texto.",
    "string.empty": "A senha não pode estar vazia.",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres.",
    "string.max": "A senha deve ter no máximo {#limit} caracteres.",
  }),
  points: Joi.number().integer().min(0).messages({
    "number.base": "Os pontos devem ser um número.",
    "number.integer": "Os pontos devem ser um número inteiro.",
    "number.min": "Os pontos devem ser zero ou maior.",
  }),
  address: Joi.string().trim().min(3).max(65).messages({
    "string.base": "O endereço deve ser um texto.",
    "string.empty": "O endereço não pode estar vazio.",
    "string.min": "O endereço deve ter pelo menos {#limit} caracteres.",
    "string.max": "O endereço deve ter no máximo {#limit} caracteres.",
  }),
  telephone: Joi.string().trim().min(8).max(16).messages({
    "string.base": "O telefone deve ser um texto.",
    "string.empty": "O telefone não pode estar vazio.",
    "string.min": "O telefone deve ter pelo menos {#limit} caracteres.",
    "string.max": "O telefone deve ter no máximo {#limit} caracteres.",
  }),
  cnh_code: Joi.string().trim().min(5).max(25).messages({
    "string.base": "O código CNH deve ser um texto.",
    "string.empty": "O código CNH não pode estar vazio.",
    "string.min": "O código CNH deve ter pelo menos {#limit} caracteres.",
    "string.max": "O código CNH deve ter no máximo {#limit} caracteres.",
  }),
  cnh_category: Joi.string().trim().min(1).max(6).messages({
    "string.base": "A categoria CNH deve ser um texto.",
    "string.empty": "A categoria CNH não pode estar vazia.",
    "string.min": "A categoria CNH deve ter pelo menos {#limit} caracteres.",
    "string.max": "A categoria CNH deve ter no máximo {#limit} caracteres.",
  }),
  honors_id: Joi.string().guid().messages({
    "string.base": "O ID de honrarias deve ser um UUID válido.",
    "string.guid": "O ID de honrarias deve ser um UUID válido.",
    "string.empty": "O ID de honrarias não pode estar vazio.",
  }),
  nationalities_id: Joi.string().guid().messages({
    "string.base": "O ID da nacionalidade deve ser um UUID válido.",
    "string.guid": "O ID da nacionalidade deve ser um UUID válido.",
    "string.empty": "O ID da nacionalidade não pode estar vazio.",
  }),
});
