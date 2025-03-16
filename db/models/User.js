import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const User = sequelize.define("User", {
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	subscription: {
		type: DataTypes.ENUM,
		values: ["starter", "pro", "business"],
		defaultValue: "starter",
	},
	token: {
		type: DataTypes.STRING,
		defaultValue: null,
	},
	avatarURL: {
		type: DataTypes.STRING,
		defaultValue: null,
	},
	verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	verificationToken: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

export default User;
