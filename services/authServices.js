import User from "../db/models/User.js";
import gravatar from "gravatar";

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

export function register({ email, password }) {
	const avatarURL = gravatar.url(email);
	return User.create({ email, password, avatarURL });
}

export async function logout(id) {
	return update({ id }, { token: null });
}

export async function updateAvatar(id, avatarURL) {
	return update({ id }, { avatarURL });
}
