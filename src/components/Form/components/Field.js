import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React, { Component, cloneElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, withState } from 'recompose';
import { Field } from 'redux-form';

// Utils
import reduxFieldAdapter from '../utils/reduxFieldAdapter';

// Styles
import { Typography } from 'styles';
import styles from './Field.scss';

class FormField extends Component {
  state = { id: uniqueId('field_') }

  render() {
    const { children, placeholder, type, withoutLabel } = this.props;
    const { id } = this.state;

    return (
      <Field {...this.props} component={reduxFieldAdapter} type={type}>
        {({ error, label, ...props }) => (
          <div className={styles.Root}>
            {!withoutLabel && label && (
              <div className={styles.Header}>
                <Typography
                  className={styles.Label}
                  component="label"
                  htmlFor={id}
                  variant={Typography.VARIANT.OVERLINE}
                >
                  <FormattedMessage
                    id={label}
                    defaultMessage={label}
                  />
                </Typography>

                {error && (
                  <Typography
                    className={styles.Error}
                    variant={Typography.VARIANT.OVERLINE}
                  >
                    {error}
                  </Typography>
                )}
              </div>
            )}

            <div className={styles.Control}>
              <FormattedMessage
                id={placeholder || '12345'}
                defaultMessage={placeholder || ' '}
              >
                {(placeholder: string): void => typeof children === 'function'
                  ? children({ ...props, id, label, placeholder, type, isErred: !!error })
                  : cloneElement(children, { ...props, id, label, placeholder, type, isErred: !!error })}
              </FormattedMessage>
            </div>
          </div>
        )}
      </Field>
    );
  }
}

FormField.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export default compose(
  withState('id', 'setId', uniqueId('field_')),
)(FormField);
