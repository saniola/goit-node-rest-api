import User from "../db/models/User.js";

async function update(query, data) {
	const user = await findUser(query);
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
	return User.create({ email, password });
}

export async function logout(id) {
	return update({ id }, { token: null });
}
