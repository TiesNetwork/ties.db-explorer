import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React, { Component, cloneElement } from 'react';
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
    const { children, withoutLabel } = this.props;
    const { id } = this.state;
    const error = true;

    const rootClassNames = classNames(styles.Root, {
      [styles.RootIsErred]: !!error,
    });

    return (
      <Field {...this.props} component={reduxFieldAdapter}>
        {({ label, ...props }) => (
          <div className={rootClassNames}>
            {!withoutLabel && label && (
              <div className={styles.Header}>
                <Typography
                  className={styles.Label}
                  component="label"
                  htmlFor={id}
                  variant={Typography.VARIANT.OVERLINE}
                >
                  {label}
                </Typography>
              </div>
            )}

            <div className={styles.Control}>
              {typeof children === 'function'
                ? children({ ...props, id, label, isErred: !!error })
                : cloneElement(children, { ...props, id, label, isErred: !!error })
              }
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
