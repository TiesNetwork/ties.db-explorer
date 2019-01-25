import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

// Components
import Field from './Field';

// Styles
import styles from './Input.scss';

const FormInput = ({
  id,
  error,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,

  // Handlers
  handleBlur,
  handleFocus,

  // State
  isErred,
  isFocused,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsErred]: isErred,
    [styles.RootIsFocused]: isFocused,
  });

  return (
    <div className={rootClassNames}>
      <input
        autoComplete="off"
        className={styles.Input}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string,
  isErred: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

const ComposedFormInput = compose(
  withState('isFocused', 'setFocus', false),
  withHandlers({
    handleBlur: ({ onBlur, setFocus }) => (event: Object) => {
      setFocus(false);
      onBlur && onBlur(event);
    },
    handleFocus: ({ onFocus, setFocus }) => (event: Object) => {
      setFocus(true);
      onFocus && onFocus(event);
    },
  }),
)(FormInput);

export default (props: Object) => (
  <Field {...props}>
    <ComposedFormInput />
  </Field>
);
