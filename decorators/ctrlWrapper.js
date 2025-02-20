export const ctrlWrapper = (fn) => async (req, res, next) => {
	try {
		return await fn(req, res, next);
	} catch (error) {
		next(error);
	}
};
