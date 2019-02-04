import classNames from 'classnames';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

// Components
import Field from '../Field';

// Styles
import { Typography } from 'styles';
import styles from './Select.scss';

const FormSelect = ({
  // props
  children,
  id,
  name,
  placeholder,
  value,

  // Handlers
  handleBlur,
  handleChange,
  handleCreate,
  handleDelete,
  handleFocus,

  // Registers
  registerInput,
  registerRoot,

  // State
  inputValue,
  isFocused,
  isMultiple,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsFocused]: !!isFocused,
    [styles.RootIsMultiple]: !!isMultiple,
    [styles.RootIsEmpty]: !!isEmpty(value),
  });

  return (
    <div
      className={rootClassNames}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={registerRoot}
      tabIndex={0}
    >
      <div className={styles.Container}>
        <div className={styles.Control}>
          {isMultiple && value && value.length > 0 && value.map(({ label, value }) => (
            <div className={styles.Option} key={value}>
              <Typography
                className={styles.OptionLabel}
                variant={Typography.VARIANT.BODY2}
              >
                {label}
              </Typography>

              <button
                className={styles.OptionDelete}
                onClick={() => handleDelete(value)}
                type="button"
              >
                <i className={classNames(styles.OptionIcon, 'fas fa-times-circle')} />
              </button>
            </div>
          ))}

          <input
            autoComplete="off"
            className={styles.Input}
            id={id}
            name={name}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={isEmpty(value) ? placeholder : ''}
            ref={registerInput}
            size={(inputValue.length || 6) + 2}
            type="text"
            value={isFocused
              ? inputValue
              : !isMultiple
                ? get(value, 'label', '')
                : ''
            }
          />
        </div>
      </div>

      {children && isFocused && (
        <div className={styles.Dropdown}>
          <div className={styles.List}>
            {children({
              value,
              inputValue: inputValue.toLowerCase(),
              onClick: handleCreate,
            })}
          </div>
        </div>
      )}
    </div>
  );
};

FormSelect.propTypes = {
  children: PropTypes.func,
  id: PropTypes.string,
  isMultiple: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    PropTypes.string,
  ]),
};

const ComposedFormSelect = compose(
  withState('isFocused', 'setFocus', false),
  withState('inputValue', 'setInputValue', ''),
  withHandlers(() => {
    let $input;
    let $root;

    return {
      // Handlers
      handleBlur: ({ setFocus, setInputValue }) => (event: Object) => {
        if (!$root.contains(event.relatedTarget)) {
          $input.blur();

          setFocus(false);
          setInputValue('');
        }
      },
      handleChange: ({ setInputValue }) => (event: Object) =>
        setInputValue(get(event, 'target.value', '')),
      handleCreate: ({ isMultiple, onChange, setFocus, value }) => (itemValue: Object) => {
        if (!isMultiple) {
          $input.blur();
          setFocus(false);
        }

        onChange && onChange(isMultiple
          ? [...(value || []), itemValue]
          : itemValue
        );
      },
      handleDelete: ({ onChange, value }) => (itemValue: ?string) =>
        onChange && onChange(value.filter(({ value }) => value !== itemValue )),
      handleFocus: ({ setFocus }) => () => {
        $input.focus();
        setFocus(true);
      },

      // Registers
      registerRoot: () => (node: HTMLElement) => {
        $root = node;
      },
      registerInput: () => (node: HTMLElement) => {
        $input = node;
      },
    };
  }),
)(FormSelect);

export default ({ children, ...props }) => (
  <Field {...props}>
    <ComposedFormSelect>
      {children}
    </ComposedFormSelect>
  </Field>
);
