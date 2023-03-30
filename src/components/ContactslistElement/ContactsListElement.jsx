import React from 'react';

import css from './ContactsListElement.module.css';
import PropTypes from 'prop-types';

const ContactsListElement = ({ id, name, number, deleteContact }) => {
  //const { id, name, number } = contact;
  return (
    <li key={id} className={css.contactLi}>
      <span className={css.contact}>{name}:</span>
      <span className={css.contact}>{number}</span>
      <button
        key={id}
        type="button"
        className={css.btnDelete}
        onClick={deleteContact}
      >
        Delete
      </button>
    </li>
  );
};

ContactsListElement.propTypes = {
  //contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};

export default ContactsListElement;
