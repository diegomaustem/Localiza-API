import Joi from "joi";

export const createUserSchema = Joi.object({
  nome: Joi.string().trim().min(3).max(50).required(),
  sobrenome: Joi.string().trim().min(3).max(100).required(),
  cpf: Joi.string().length(11).pattern(/^\d+$/).required(),
  rg: Joi.string().min(5).max(15).pattern(/^\d+$/).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  endereco: Joi.string().trim().min(5).required(),
  telefone: Joi.string().min(10).max(15).required(),
  numeroCarteira: Joi.string().pattern(/^\d+$/).required(),
  tipoCarteira: Joi.string()
    .valid("A", "B", "C", "D", "E", "AB", "AC", "AD", "AE")
    .required(),
}).min(1);

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
  tipoCarteira: Joi.string().valid(
    "A",
    "B",
    "C",
    "D",
    "E",
    "AB",
    "AC",
    "AD",
    "AE"
  ),
}).min(1);
