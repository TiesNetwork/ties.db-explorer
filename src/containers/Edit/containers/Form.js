import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form, { Input } from 'components/Form';

import Fields from '../components/Fields';
import Type from '../components/Type';

// Ducks
import { closeModal } from 'services/modals';
import {
  EDIT_FORM_ID,
  EDIT_MODAL_ID,
} from '../ducks';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
// import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Utils
import createSchema from '../utils/schema';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './Form.scss';

const EditForm = ({
  // Props
  hash,
  initialValues,
  title,
  type,

  // Handlers
  handleClose,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <div className={styles.Header}>
      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H6}
      >
        {`${hash ? 'Update' : 'Create'} ${title}`}

        {hash && (
          <div className={styles.Name}>
            «{get(initialValues, 'name')}»
          </div>
        )}
      </Typography>
    </div>

    <div className={styles.Form}>
      <Input label="Name" name="name" placeholder="Set Name" />

      {type === FIELDS_ENTITY_ID && <Type />}
      {type === FIELDS_ENTITY_ID && (
        <Input
          label="Default Value"
          name="defaultValue"
          placeholder="Set Default Value"
        />
      )}

      {type === INDEXES_ENTITY_ID && <Fields tableHash={get(initialValues, 'tableHash')} />}
    </div>

    <div className={styles.Actions}>
      <div className={styles.Left}>
        {hash && (
          <Button color={COLOR.DANGER}>
            Delete
          </Button>
        )}
      </div>

      <div className={styles.Right}>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button color={COLOR.SUCCESS} type="submit">
          Save
        </Button>
      </div>
    </div>
  </Form>
);

const mapStateToProps = (state, { hash = '', name, type }) => {
  const { entity, ...schema } = createSchema(state, type);
  const initialValues = get(state, `entities.${entity}.${hash}`, { name });

  return {
    ...schema, initialValues,
  };
};

export default compose(
  connect(mapStateToProps, { closeModal }),
  reduxForm({
    form: EDIT_FORM_ID,
    onSubmit: (value: Object, dispatch: func, { create }): void =>
      create && dispatch(create(value)),
  }),
  withHandlers({
    handleClose: ({ closeModal }) => (event: Object) =>
      closeModal(EDIT_MODAL_ID),
  }),
)(EditForm);
