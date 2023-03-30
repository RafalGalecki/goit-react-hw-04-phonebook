import { useState, useEffect } from 'react';
import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

const STORAGE_KEY = 'myContacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const persistedContacts = localStorage.getItem(STORAGE_KEY);

    if (persistedContacts) {
      setContacts(JSON.parse(persistedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const getFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={getFilter}
        filteredContacts={filterContacts()}
      />
      <ContactsList
        contactsLength={contacts.length}
        contacts={filterContacts()}
        deleteContact={deleteContact}
      ></ContactsList>
    </div>
  );
};
