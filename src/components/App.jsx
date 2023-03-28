import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import ContactsListElement from './ContactslistElement/ContactsListElement';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

export class App extends Component {
  STORAGE_KEY = 'myContacts';
  state = {
    contacts: [],
    filter: '',
  };

  // localStorage logic starts here:
  componentDidMount() {
    const persistedContacts = localStorage.getItem(this.STORAGE_KEY);

    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
      console.log('get on start');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }
  // // localStorage logic end

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    // THe syntax without localStorage:
    // this.setState({
    //   contacts: [...this.state.contacts, contact],
    // });
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  filter = element => {
    this.setState({
      filter: element.currentTarget.value,
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const value = this.state.filter;
    const filteredContacts = this.filterContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <Filter
          value={value}
          filterContacts={this.filterContacts}
          onChange={this.filter}
        />
        <ContactsList contactsLength={this.state.contacts.length}>
          <ContactsListElement
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </ContactsList>
      </div>
    );
  }
}

App.propTypes = {
  filteredContacts: PropTypes.array,
};

// mock contacts:
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
