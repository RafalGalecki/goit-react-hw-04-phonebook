import { useState, useEffect } from 'react';
//import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import ContactsListElement from './ContactslistElement/ContactsListElement';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

 const STORAGE_KEY = 'myContacts';
const INITIAL_CONTACTS = {
  id: '',
  name: '',
  number: '',
}
export const App = () => {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [filter, setFilter] = useState('');

  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  // localStorage logic starts here:
  useEffect(() => {
    const persistedContacts = localStorage.getItem(STORAGE_KEY);

    if (persistedContacts) {
      setContacts({ contacts: JSON.parse(persistedContacts) });
      console.log('get on start');
    }
  }, [])

  useEffect(() => {
localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(contacts)
      );
  }, [contacts])

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem(
  //       this.STORAGE_KEY,
  //       JSON.stringify(this.state.contacts)
  //     );
  //   }
  // }
  // // localStorage logic end

  const addContact = contact => {
    setContacts(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    // THe syntax without localStorage:
    // this.setState({
    //   contacts: [...this.state.contacts, contact],
    // });
  };

  const deleteContact = id => {
    setContacts({
      contacts: contacts.filter(contact => contact.id !== id),
    });
  };

  const filterContacts = element => {
    setFilter({
      filter: element.currentTarget.value,
    });
  };

  const filteredContacts = () => {
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

 
    //const value = this.state.filter;
    //const filteredContacts = this.filterContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={addContact}
          contacts={contacts}
        />
        <h2>Contacts</h2>
        <Filter
          value={filter}
          filterContacts={filteredContacts}
          onChange={filterContacts}
        />
        <ContactsList contactsLength={contacts.length}>
          <ContactsListElement
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </ContactsList>
      </div>
    );
  }


App.propTypes = {
  filteredContacts: PropTypes.array,
};

// mock contacts:
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
