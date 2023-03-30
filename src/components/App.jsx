import { useState, useEffect } from 'react';
import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'myContacts';
// const INITIAL_MOCK_CONTACTS = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// ];

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const persistedContacts = localStorage.getItem(STORAGE_KEY);
    console.log('get from storage');
    if (persistedContacts) {
      setContacts(JSON.parse(persistedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    console.log('set to storage', contacts)
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

App.propTypes = {
  filteredContacts: PropTypes.array,
};


