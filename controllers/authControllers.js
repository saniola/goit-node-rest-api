import bcrypt from "bcryptjs";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";

export async function register(req, res) {
	const user = await authServices.find({ email: req.body.email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	const result = await authServices.register({
		...req.body,
		password: hashedPassword,
	});

	res.status(201).json({
		user: {
			email: result.email,
			subscription: result.subscription,
		},
	});
}

export async function login(req, res) {
	const user = await authServices.find({ email: req.body.email });

	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}

	const isValidPassword = await bcrypt.compare(
		req.body.password,
		user.password,
	);

	if (!isValidPassword) {
		throw HttpError(401, "Email or password is wrong");
	}

	const token = createToken({ email: req.body.email });

	await user.update({ token });

	res.status(200).json({
		token,
	});
}

export function current(req, res) {
	const { email, subscription } = req.user;

	res.json({
		email,
		subscription,
	});
}

export async function logout(req, res) {
	const { id } = req.user;

	await authServices.logout(id);

	res.status(204).json({
		message: "Logged out",
	});
}
