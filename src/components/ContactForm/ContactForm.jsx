//import { Component } from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';



const ContactForm = ({ contacts, addUserToContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const prop = event.currentTarget.name;
    switch (prop) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'number':
        setNumber(event.currentTarget.value);
        break;
      default:
        throw new Error('Error');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      name,
      number,
      id: nanoid(),
    };

    let contactExists = false;

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === user.name.toLowerCase()) {
        Notify.info(`${contact.name} is already in the Phonebook.`);
        contactExists = true;
      }
    });

    if (!contactExists) {
      addUserToContacts(user);
      Notify.success(`${user.name} was added to the Phonebook.`);
    }

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form className={css.formBox} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        className={css.inputName}
        placeholder="Enter contact's name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        type="tel"
        name="number"
        value={number}
        className={css.inputName}
        placeholder="Enter contact's number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />
      <button type="submit" className={css.btn} name="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  addContact: PropTypes.func,
};

export default ContactForm;
