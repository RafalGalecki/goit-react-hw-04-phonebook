import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    //const { name, number } = this.state;
    const { contacts, addContact } = this.props;
    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    let isContact;
    contacts.forEach(person => {
      if (contact.name.toLowerCase() === person.name.toLowerCase()) {
        isContact = true;
      }
    });
    isContact
      ? Notiflix.Notify.warning(`${contact.name} is already in contacts.`, {
          timeout: 3000,
          position: 'left-top',
          closeButton: true,
        })
      : addContact(contact);

    this.reset();
  };
  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { name, number } = this.state;
    const nameInputId = nanoid();
    const numberInputId = nanoid();

    return (
      <form className={css.formBox} onSubmit={this.handleSubmit}>
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
          onChange={this.handleChange}
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
          onChange={this.handleChange}
        />
        <button type="submit" className={css.btn} name="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  addContact: PropTypes.func,
};

export default ContactForm;
