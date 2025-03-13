import Contact from "../db/models/Contact.js";

const listContacts = (query) => Contact.findAll({ where: query });

const getContact = (query) => Contact.findOne({ where: query });

const addContact = (contact) => Contact.create(contact);

const updateContact = async (query, newData) => {
	const contact = await getContact(query);

	if (!contact) return null;

	return await contact.update(newData, { returning: true });
};

const removeContact = (query) => Contact.destroy({ where: query });

const updateStatusContact = async (query, { favorite }) => {
	const contact = await getContact(query);
	if (!contact) return null;
	return await contact.update({ favorite });
};

export default {
	listContacts,
	getContact,
	addContact,
	removeContact,
	updateContact,
	updateStatusContact,
};
