import Joi from "joi";

export const createContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
});

export const updateFavoriteContactSchema = Joi.object({
	favorite: Joi.boolean().required(),
});
