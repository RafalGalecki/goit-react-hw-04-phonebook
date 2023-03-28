import { Component } from 'react';
import css from './ContactsList.module.css';
import PropTypes from 'prop-types';

class ContactsList extends Component {
  render() {
    const { contactsLength, children } = this.props;

    return (
      <div className={css.contactsListBox}>
        <h4>
          You have {contactsLength} contact{contactsLength === 1 ? null : 's'}
        </h4>
        <ul className={css.contactsList}>{children}</ul>
      </div>
    );
  }
}

ContactsList.propTypes = {
  children: PropTypes.node,
  contactsLength: PropTypes.number,
};

export default ContactsList;
