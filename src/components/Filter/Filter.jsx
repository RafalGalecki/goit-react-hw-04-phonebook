//import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  const filterId = nanoid();
  return (
    <div className={css.filter}>
      <label htmlFor={filterId}>Find contacts by name</label>
      <input
        className={css.inputFilter}
        id={filterId}
        type="search"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  filteredContacts: PropTypes.array,
  onChange: PropTypes.func,
};

export default Filter;
