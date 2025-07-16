import Joi from "joi";

export const createPriceSchema = Joi.object({
  price: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Price must be a number.",
    "number.precision": "Price can have at most {#limit} decimal places.",
    "number.min": "Price cannot be a negative value.",
    "any.required": "Price is required.",
  }),
});

export const updatePriceSchema = Joi.object({
  name: Joi.number().precision(2).min(0).required(),
});
