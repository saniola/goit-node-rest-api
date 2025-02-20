import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

const listContacts = async () => {
	const data = await readFile(contactsPath);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	return contacts.find(({ id }) => id === contactId) || null;
};

const addContact = async (contact) => {
	const contacts = await listContacts();
	const newContact = { ...contact, id: nanoid() };
	contacts.push(newContact);
	await writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(({ id }) => id === contactId);
	if (index === -1) return null;
	const [removedContact] = contacts.splice(index, 1);
	await writeFile(contactsPath, JSON.stringify(contacts));
	return removedContact;
};

const updateContact = async (contactId, data) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(({ id }) => id === contactId);
	if (index === -1) return null;
	const updatedContact = { ...contacts[index], ...data };
	contacts[index] = updatedContact;
	await writeFile(contactsPath, JSON.stringify(contacts));
	return updatedContact;
};

export default {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
};
