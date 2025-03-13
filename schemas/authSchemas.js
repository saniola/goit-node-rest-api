import Joi from "joi";

export const registerSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "Invalid email format",
		"any.required": "Email is required",
	}),
	password: Joi.string().min(6).required().messages({
		"string.min": "Password must be at least 6 characters long",
		"any.required": "Password is required",
	}),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "Invalid email format",
		"any.required": "Email is required",
	}),
	password: Joi.string().min(6).required().messages({
		"string.min": "Password must be at least 6 characters long",
		"any.required": "Password is required",
	}),
});
