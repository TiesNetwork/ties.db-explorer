import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form, { Input } from 'components/Form';

import Json from '../components/Json'

// Ducks
import { IMPORT_FORM_ID, IMPORT_MODAL_ID } from '../ducks';

// Entities
import { createAccount } from 'entities/accounts';

// Services
import { closeModal } from 'services/modals';

// Utils
import validate, { required } from 'utils/validate';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './Form.scss';

const AccountForm = ({
  error,

  // Handlers
  handleClose,
  handleSubmit,
}) => {
  const iconClassNames = classNames(styles.ErrorIcon, 'fas', 'fa-exclamation-triangle');

  return (
    <Form
      error={error}
      onSubmit={handleSubmit}
    >
      <div className={styles.Header}>
        <Typography
          className={styles.Title}
          variant={Typography.VARIANT.H6}
        >
          Import Account
        </Typography>
      </div>

      {error && (
        <div className={styles.Error}>
          <i className={iconClassNames} />

          <Typography
            className={styles.ErrorContent}
            variant={Typography.VARIANT.BODY1}
          >
            {error}
          </Typography>
        </div>
      )}

      <Input label="Name" name="name" placeholder="Set Name" />
      <Input label="Password" name="password" type="password" />

      <div className={styles.Actions}>
        <div className={styles.Left}>
          <Json label="Import JSON" name="json" />
        </div>

        <div className={styles.Right}>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button color={COLOR.PRIMARY} type="submit">
            Create
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default compose(
  connect(null, { closeModal }),
  reduxForm({
    form: IMPORT_FORM_ID,
    onSubmit: (value: Object, dispatch: func) =>
      dispatch(createAccount(value)),
    validate: validate({
      // json: [required()],
      name: [required()],
      password: [required()],
    }),
  }),
  withHandlers({
    handleClose: ({ closeModal }) => (event: Object) =>
      closeModal(IMPORT_MODAL_ID),
  }),
)(AccountForm);
