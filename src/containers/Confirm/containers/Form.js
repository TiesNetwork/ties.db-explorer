import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form, { Input } from 'components/Form';

// Ducks
import {
  CONFIRM_FORM_ID,
  CONFIRM_MODAL_ID,
} from '../ducks/constants';

// Services
import { closeModal } from 'services/modals';

// Utils
import validate, { required } from 'utils/validate';

// Styles
import { COLOR } from 'styles';
import styles from './Form.scss';

const ConfirmForm = ({
  // Handlers
  handleClose,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Password" name="password" type="password" />

    <div className={styles.Actions}>
      <Button onClick={handleClose}>
        Cancel
      </Button>

      <Button
        color={COLOR.PRIMARY}
        type="submit"
      >
        Confirm
      </Button>
    </div>
  </Form>
);

export default compose(
  connect(null, { closeModal }),
  reduxForm({
    form: CONFIRM_FORM_ID,
    validate: validate({
      password: [required()],
    }),
  }),
  withHandlers({
    handleClose: ({ closeModal }): func => (event: Object): void =>
      closeModal(CONFIRM_MODAL_ID),
  }),
)(ConfirmForm)
