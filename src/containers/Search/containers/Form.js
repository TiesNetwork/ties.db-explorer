/* eslint-disable */
import classNames from 'classnames';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Ducks
import { SEARCH_FORM_ID } from '../ducks/constants';

// Styles
import { Typography } from 'styles';
import styles from './Form.scss';

const SearchForm = ({
  handleSubmit,
}) => {
  const iconClassNames = classNames(styles.Icon, 'far', 'fa-search');

  return (
    <form
      className={styles.Root}
      onSubmit={handleSubmit}
    >
      <div className={styles.Left}>
        <i className={iconClassNames} />
      </div>

      <div className={styles.Control}>
        <Typography
          className={styles.Label}
          component="label"
          htmlFor="search"
          variant={Typography.VARIANT.OVERLINE}
        >
          What are you looking for?
        </Typography>

        <Field
          autoComplete="off"
          autoFocus
          className={styles.Input}
          component="input"
          id="search"
          name="search"
          placeholder="Type something..."
        />
      </div>

    </form>
  );
};

export default reduxForm({
  form: SEARCH_FORM_ID,
})(SearchForm);
