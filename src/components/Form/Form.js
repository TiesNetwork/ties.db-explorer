import PropTypes from 'prop-types';
import React from 'react';

// Styles
import styles from './Form.scss';

const Form = ({
  children,
  className,
  error,
  onSubmit,
}) => (
  <form
    className={className}
    onSubmit={onSubmit}
  >
    <div className={styles.Container}>
      {children}
    </div>
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
