import React from 'react';
import { compose, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form, { Input } from 'components/Form';

// Ducks
import { CONNECTION_FORM_ID } from '../ducks/constants';

// Entities
import { createConnection } from 'entities/connections';

// Utils
import validate, { isUrl, required } from 'utils/validate';

// Styles
import { COLOR, GRADIENT, Typography } from 'styles';
import styles from './Common.scss';

const ConnectionsEdit = ({
  handleCancel,
  handleSubmit,
}): Function => (
  <Form
    className={styles.Root}
    onSubmit={handleSubmit}
  >
    <Typography
      className={styles.Title}
      variant={Typography.VARIANT.H6}
    >
      Create Connection
    </Typography>

    <div className={styles.Container}>
      <Input
        label="Set Title"
        name="title"
        placeholder="For example: RinkeBy connection"
      />

      <Input
        label="Set Url"
        name="url"
        placeholder="infura.io, localhost, etc."
      />

      <Input
        label="Contract Address"
        name="address"
        placeholder="0x22d1b55ebb5bc..."
      />
    </div>

    <div className={styles.Actions}>
      <Button
        color={COLOR.SECONDARY}
        onClick={handleCancel}
      >
        Cancel
      </Button>

      <Button
        color={GRADIENT.GREEN}
        type="submit"
      >
        Test & Create
      </Button>
    </div>
  </Form>
);

export default compose(
  reduxForm({
    form: CONNECTION_FORM_ID,
    onSubmit: (values: Object, dispatch: Function): void =>
      dispatch(createConnection(values)),
    validate: validate({
      title: [required()],
      url: [required(), isUrl()],
    }),
  }),
  withHandlers({
    handleCancel: ({ history }): Function =>
      (event: Object): void =>
        history.push('/connections'),
  }),
)(ConnectionsEdit);
