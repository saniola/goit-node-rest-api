import User from "../db/models/User.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { sendEmail } from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

async function update(query, data) {
	const user = await find(query);
	if (!user) {
		return null;
	}

	return user.update(data, { returning: true });
}

export async function find(query) {
	const user = await User.findOne({ where: query });
	return user;
}

export async function register({ email, password }) {
	const verificationToken = nanoid();
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		email,
		password,
		avatarURL,
		verificationToken,
	});

	try {
		await sendEmail({
			to: email,
			subject: "Test email",
			html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify</a>`,
		});
	} catch (error) {
		console.log(error.message);
	}

	return newUser;
}

export async function logout(id) {
	return update({ id }, { token: null });
}

export async function updateAvatar(id, avatarURL) {
	return update({ id }, { avatarURL });
}

export async function resendVerify(email, token) {
	return sendEmail({
		to: email,
		subject: "Test email",
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${token}">Click to verify</a>`,
	});
}
