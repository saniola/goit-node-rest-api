import "dotenv/config";
import nodemailer from "nodemailer";

const { UKR_NET_MAIL, UKR_NET_PASSWORD } = process.env;
const nodemailerConfig = {
	host: "smtp.ukr.net",
	port: 465,
	secure: true,
	auth: {
		user: UKR_NET_MAIL,
		pass: UKR_NET_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
	const email = {
		from: `Alex Kydanov ${UKR_NET_MAIL}`,
		...data,
	};

	return transport.sendMail(email);
};
