import React from 'react';

import css from './ContactsListElement.module.css';
import PropTypes from 'prop-types';

const ContactsListElement = ({ id, name, number, deleteContact }) => {
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
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  deleteContact: PropTypes.func,
};

export default ContactsListElement;
