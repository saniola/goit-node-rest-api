import express from "express";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import { validateBody } from "../decorators/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import {
	register,
	login,
	logout,
	current,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
	"/register",
	validateBody(registerSchema),
	ctrlWrapper(register),
);

authRouter.post("/login", validateBody(loginSchema), ctrlWrapper(login));

authRouter.get("/current", authenticate, ctrlWrapper(current));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

export default authRouter;
