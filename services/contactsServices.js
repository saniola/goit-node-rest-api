import { resolve } from "node:path";
import Contact from "../db/models/contact.js";

const listContacts = async () => {
	return await Contact.findAll();
};

const getContactById = async (contactId) => {
	return await Contact.findByPk(contactId);
};

const addContact = async (contact) => {
	return await Contact.create(contact);
};

const updateContact = async (contactId, newData) => {
	const contact = await Contact.findByPk(contactId);
	if (!contact) return null;
	return await contact.update(newData);
};

const removeContact = async (contactId) => {
	const contact = await Contact.findByPk(contactId);
	if (!contact) return null;
	await contact.destroy();
	return contact;
};

const updateStatusContact = async (contactId, { favorite }) => {
	const contact = await Contact.findByPk(contactId);
	if (!contact) return null;
	return await contact.update({ favorite });
};

export default {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateStatusContact,
};
