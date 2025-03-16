import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";

const avatarsPath = path.resolve("public", "avatars");

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

	if (!user.verified) {
		throw HttpError(401, "Email is not verified");
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

export async function uploadAvatar(req, res) {
	const { id } = req.user;
	const { path: oldPath, filename } = req.file;
	const newPath = path.join(avatarsPath, filename);

	await fs.rename(oldPath, newPath);
	await authServices.updateAvatar(id, newPath);

	res.json({
		avatarURL: newPath,
	});
}

export async function verify(req, res) {
	const { verificationToken } = req.params;
	const user = await findUser({ verificationToken });

	if (!user) {
		throw HttpError(404, "User not found");
	}

	await user.update({ verificationToken: null, verified: true });

	res.status(200).json({
		message: "Verification successful",
	});
}

export async function resendVerify(req, res) {
	const { email } = req.body;
	const user = await findUser({ email });

	if (!user) {
		throw HttpError(404, "User not found");
	}

	if (user.verified) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verificationToken = nanoid();

	await user.update({ verificationToken });
	await authServices.resendVerify(email, verificationToken);

	res.status(200).json({
		message: "Verification email sent",
	});
}
