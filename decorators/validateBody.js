import HttpError from "../helpers/HttpError.js";

export const validateBody = (schema) => {
	const func = async (req, _, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			next(HttpError(400, error.message));
		}

		next();
	};

	return func;
};
