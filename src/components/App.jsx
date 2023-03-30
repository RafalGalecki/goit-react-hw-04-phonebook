import { useState, useEffect } from 'react';
//import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
//import ContactsListElement from './ContactslistElement/ContactsListElement';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

//const STORAGE_KEY = 'myContacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterValue = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const addUserToContacts = user => {
    setContacts([...contacts, user]);
  };

  const deleteContact = identification => {
    const deletedName = contacts.find(({ id }) => id === identification).name;

    setContacts(prevState =>
      prevState.filter(contact => contact.id !== identification)
    );

    Notify.success(`${deletedName} was deleted from the Phonebook.`);
  };

  const filteredContacts = filterContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addUserToContacts={addUserToContacts} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={filterValue}
        filteredContacts={filteredContacts}
      />
      <ContactsList
        contactsLength={contacts.length}
        contacts={filteredContacts}
        deleteContact={deleteContact}
      >
        {/* {contacts.map(contact => (
          <ContactsListElement
            key={contact.id}
            name={contact.name}
            number={contact.number}
            deleteContact={deleteContact}
          />
        ))} */}
      </ContactsList>
    </div>
  );
};

App.propTypes = {
  filteredContacts: PropTypes.array,
};

// mock contacts:
