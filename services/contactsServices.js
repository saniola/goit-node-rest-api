import { resolve } from "node:path";
import Contact from "../db/models/contact.js";

const listContacts = () => Contact.findAll();

const getContactById = (contactId) => Contact.findByPk(contactId);

const addContact = (contact) => Contact.create(contact);

const updateContact = async (contactId, newData) => {
	const contact = await getContactById(contactId);
	if (!contact) return null;
	return await contact.update(newData, { returning: true });
};

const removeContact = (contactId) =>
	Contact.destroy({
		where: { id: contactId },
	});

const updateStatusContact = async (contactId, { favorite }) => {
	const contact = await getContactById(contactId);
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
