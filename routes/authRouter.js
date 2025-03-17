import express from "express";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import {
	registerSchema,
	loginSchema,
	verifySchema,
} from "../schemas/authSchemas.js";
import { validateBody } from "../decorators/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import {
	register,
	login,
	logout,
	current,
	uploadAvatar,
	verify,
	resendVerify,
} from "../controllers/authControllers.js";
import upload from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post(
	"/register",
	validateBody(registerSchema),
	ctrlWrapper(register),
);

authRouter.post("/login", validateBody(loginSchema), ctrlWrapper(login));

authRouter.get("/current", authenticate, ctrlWrapper(current));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	ctrlWrapper(uploadAvatar),
);

authRouter.get("/verify/:verificationToken", ctrlWrapper(verify));

authRouter.post(
	"/verify",
	validateBody(verifySchema),
	ctrlWrapper(resendVerify),
);

export default authRouter;
