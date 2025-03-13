export const ctrlWrapper = (fn) => async (req, res, next) => {
	try {
		return await fn(req, res, next);
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			error.status = 409;
		}
		if (error.name === "SequelizeValidationError") {
			error.status = 400;
		}

		next(error);
	}
};
