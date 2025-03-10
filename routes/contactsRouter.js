import express from "express";
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	favoriteContact,
} from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import { validateBody } from "../decorators/validateBody.js";
import {
	createContactSchema,
	updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post(
	"/",
	validateBody(createContactSchema),
	ctrlWrapper(createContact),
);

contactsRouter.put(
	"/:id",
	validateBody(updateContactSchema),
	ctrlWrapper(updateContact),
);

contactsRouter.patch("/:contactId/favorite", ctrlWrapper(favoriteContact));

export default contactsRouter;
