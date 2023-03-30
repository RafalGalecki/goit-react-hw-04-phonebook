import React from 'react';
import ContactsListElement from '../ContactslistElement/ContactsListElement';
import css from './ContactsList.module.css';
import PropTypes from 'prop-types';

const ContactsList = ({ contactsLength, contacts, deleteContact }) => {
  return (
    <div className={css.contactsListBox}>
      <h4>
        You have {contactsLength} contact{contactsLength === 1 ? null : 's'}
      </h4>
      <ul className={css.contactsList}>
        {contacts.map(({ id, name, number }) => (
          <ContactsListElement
            key={id}
            name={name}
            number={number}
            deleteContact={() => deleteContact(id)}
          />
        ))}
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  children: PropTypes.node,
  contactsLength: PropTypes.number,
};

export default ContactsList;
