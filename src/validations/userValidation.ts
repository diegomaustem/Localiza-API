import Joi from "joi";

export const createUserSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(45).required().messages({
    "string.base": "O full_name deve ser um texto.",
    "string.empty": "O full_name não pode estar vazio.",
    "string.min": "O full_name deve ter pelo menos {#limit} caracteres.",
    "string.max": "O full_name deve ter no máximo {#limit} caracteres.",
    "any.required": "O full_name é obrigatório.",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.base": "O e-mail deve ser um texto.",
    "string.empty": "O e-mail não pode estar vazio.",
    "string.email": "O formato do e-mail é inválido.",
    "any.required": "O e-mail é obrigatório.",
  }),
  address: Joi.string().trim().min(3).max(65).required().messages({
    "string.base": "O address deve ser um texto.",
    "string.empty": "O address não pode estar vazio.",
    "string.min": "O address deve ter pelo menos {#limit} caracteres.",
    "any.required": "O address é obrigatório.",
  }),
  gender: Joi.string().trim().min(1).max(1).required().messages({
    "string.base": "O gender deve ser um texto.",
    "string.empty": "O gender não pode estar vazio.",
    "string.min": "O gender deve conter pelo menos {#limit} caractere.",
    "string.max": "O gender deve conter no máximo {#limit} caractere.",
    "any.required": "O gender é obrigatório.",
  }),
  telephone: Joi.string().trim().min(10).max(16).required().messages({
    "string.base": "O telephone deve ser um texto.",
    "string.empty": "O telephone não pode estar vazio.",
    "string.min": "O telephone deve ter pelo menos {#limit} caracteres.",
    "string.max": "O telephone deve ter no máximo {#limit} caracteres.",
    "any.required": "O telephone é obrigatório.",
  }),
  password: Joi.string().trim().min(6).max(200).required().messages({
    "string.base": "O password deve ser um texto.",
    "string.empty": "O password não pode estar vazio.",
    "string.min": "O password deve ter pelo menos {#limit} caracteres.",
    "any.required": "O password é obrigatório.",
  }),
  privileges_id: Joi.string().trim().guid().required().messages({
    "string.base": "O privileges_id deve ser um texto.",
    "string.guid": "O privileges_id deve ser um UUID válido.",
    "string.empty": "O privileges_id não pode estar vazio.",
    "any.required": "O privileges_id é obrigatório.",
  }),
  status_users_id: Joi.string().trim().guid().required().messages({
    "string.base": "O status_users_id deve ser um texto.",
    "string.guid": "O status_users_id deve ser um UUID válido.",
    "string.empty": "O status_users_id não pode estar vazio.",
    "any.required": "O status_users_id é obrigatório.",
  }),
});

export const updateUserSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(100).messages({
    "string.base": "O full_name deve ser um texto.",
    "string.empty": "O full_name não pode estar vazio.",
    "string.min": "O full_name deve ter pelo menos {#limit} caracteres.",
    "string.max": "O full_name deve ter no máximo {#limit} caracteres.",
  }),

  email: Joi.string().trim().email().messages({
    "string.base": "O e-mail deve ser um texto.",
    "string.empty": "O e-mail não pode estar vazio.",
    "string.email": "O formato do e-mail é inválido.",
  }),

  address: Joi.string().trim().min(5).messages({
    "string.base": "O address deve ser um texto.",
    "string.empty": "O address não pode estar vazio.",
    "string.min": "O address deve ter pelo menos {#limit} caracteres.",
  }),

  gender: Joi.string().trim().min(1).max(1).messages({
    "string.base": "O gender deve ser um texto.",
    "string.empty": "O gender não pode estar vazio.",
    "string.min": "O gender deve conter pelo menos {#limit} caractere.",
    "string.max": "O gender deve conter no máximo {#limit} caractere.",
  }),

  telephone: Joi.string().trim().min(10).max(15).messages({
    "string.base": "O telephone deve ser um texto.",
    "string.empty": "O telephone não pode estar vazio.",
    "string.min": "O telephone deve ter pelo menos {#limit} caracteres.",
    "string.max": "O telephone deve ter no máximo {#limit} caracteres.",
  }),

  password: Joi.string().trim().min(6).messages({
    "string.base": "O password deve ser um texto.",
    "string.empty": "O password não pode estar vazio.",
    "string.min": "O password deve ter pelo menos {#limit} caracteres.",
  }),

  privileges_id: Joi.string().trim().guid().messages({
    "string.base": "O privileges_id deve ser um texto.",
    "string.guid": "O privileges_id deve ser um UUID válido.",
    "string.empty": "O privileges_id não pode estar vazio.",
  }),

  status_users_id: Joi.string().trim().guid().messages({
    "string.base": "O status_users_id deve ser um texto.",
    "string.guid": "O status_users_id deve ser um UUID válido.",
    "string.empty": "O status_users_id não pode estar vazio.",
  }),
});
