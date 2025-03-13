import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
	const { id: owner } = req.user;

	const contacts = await contactsService.listContacts({ owner });

	res.json(contacts);
};

export const getOneContact = async (req, res) => {
	const { id: owner } = req.user;
	const { id } = req.params;
	const contact = await contactsService.getContact({ id, owner });

	if (!contact) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}

	res.json(contact);
};

export const deleteContact = async (req, res) => {
	const { id: owner } = req.user;
	const { id } = req.params;

	const removedContact = await contactsService.removeContact({ id, owner });

	if (!removedContact) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}

	res.json(removedContact);
};

export const createContact = async (req, res) => {
	const { id: owner } = req.user;

	const newContact = await contactsService.addContact({ ...req.body, owner });

	res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
	if (!req.body) {
		throw HttpError(400, "Data to update can not be empty");
	}

	const { id: owner } = req.user;
	const { id } = req.params;

	const updatedContact = await contactsService.updateContact(
		{ id, owner },
		req.body,
	);

	if (!updatedContact) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}

	res.json(updatedContact);
};

export const favoriteContact = async (req, res) => {
	const { contactId } = req.params;
	const { favorite } = req.body;
	const { id: owner } = req.user;

	if (typeof favorite !== "boolean") {
		throw HttpError(400, "Expected field favorite is boolean");
	}

	const updatedContact = await contactsService.updateStatusContact(
		{ id, owner },
		{
			favorite,
		},
	);

	if (!updatedContact) {
		throw HttpError(404, `Contact with id=${contactId} not found`);
	}

	res.status(200).json(updatedContact);
};
