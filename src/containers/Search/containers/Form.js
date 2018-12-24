import classNames from 'classnames';
import React from 'react';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';

// Styles
import styles from './Form.scss';

const SearchForm = ({
  handleSubmit,
}) => {
  const iconClassNames = classNames(styles.Icon, 'far fa-search');

  return (
    <form
      className={styles.Root}
      onSubmit={handleSubmit}
    >
      <i className={iconClassNames} />

      <Field
        autoComplete="off"
        className={styles.Input}
        component="input"
        name="search"
        placeholder="Start typing something..."
      />
    </form>
  );
};

export default compose(
  reduxForm({
    form: 'searchForm',
  }),
)(SearchForm);
