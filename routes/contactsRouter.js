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
	updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../middleware/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

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

contactsRouter.patch(
	"/:contactId/favorite",
	validateBody(updateFavoriteContactSchema),
	ctrlWrapper(favoriteContact),
);

export default contactsRouter;
