import PropTypes from 'prop-types';
import { useState } from 'react';
import css from '../Searchbar/Searchbar.module.css';

export const Searchbar = ({ handleValueSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    handleValueSubmit(value);
    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  value: PropTypes.string,
  handleValueSubmit: PropTypes.func.isRequired,
};
