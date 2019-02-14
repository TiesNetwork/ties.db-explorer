import { get } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form, { Input } from 'components/Form';

import Fields from '../components/Fields';
import FieldType from '../components/FieldType';
import IndexType from '../components/IndexType';
import Table from '../components/Table';
import Tablespace from '../components/Tablespace';

// Ducks
import { closeModal } from 'services/modals';
import {
  EDIT_FORM_ID,
  EDIT_MODAL_ID,
} from '../ducks';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TABLES_ENTITY_ID } from 'entities/tables';
import { TABLESPACES_ENTITY_ID } from 'entities/tablespaces';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Utils
import createSchema from '../utils/schema';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './Form.scss';

const EditForm = ({
  // Props
  entity,
  hash,
  initialValues,
  title,
  tableHash,
  type,

  // Handlers
  handleClose,
  handleDelete,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <div className={styles.Header}>
      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H6}
      >
        <FormattedMessage
          id={`${hash ? 'update' : 'create'}_${entity}`}
          defaultMessage={`${hash ? 'Update' : 'Create'} ${title}`}
        />

        {hash && (
          <div className={styles.Name}>
            «{get(initialValues, 'name')}»
          </div>
        )}
      </Typography>
    </div>

    <div className={styles.Form}>
      <Input label="edit_name_label" name="name" placeholder="edit_name_placeholder" />

      {type === FIELDS_ENTITY_ID && <FieldType />}
      {type === INDEXES_ENTITY_ID && <IndexType />}

      {type === FIELDS_ENTITY_ID && (
        <Input
          label="edit_default_label"
          name="defaultValue"
          placeholder="edit_default_placeholder"
        />
      )}

      {type === INDEXES_ENTITY_ID && <Fields tableHash={get(initialValues, 'tableHash')} />}

      {type === TRIGGERS_ENTITY_ID && (
        <Input
          label="edit_payload_label"
          name="payload"
          placeholder="edit_payload_placeholder"
        />)}

      {!hash && type !== TABLESPACES_ENTITY_ID && (
        <div className={styles.Extra}>
          <Tablespace name="tablespaceHash" />
          {type !== TABLES_ENTITY_ID && <Table name="tableHash" />}
        </div>
      )}
    </div>

    <div className={styles.Actions}>
      <div className={styles.Left}>
        {hash && (
          <Button
            color={COLOR.DANGER}
            onClick={handleDelete}
          >
            <FormattedMessage
              id="delete"
              defaultMessage="Delete"
            />
          </Button>
        )}
      </div>

      <div className={styles.Right}>
        <Button onClick={handleClose}>
          <FormattedMessage
            id="cancel"
            defaultMessage="Cancel"
          />
        </Button>

        {!hash && (
          <Button
            color={hash ? COLOR.SUCCESS : COLOR.PRIMARY}
            type="submit"
          >
            <FormattedMessage
              id="create"
              defaultMessage="Create"
            />
          </Button>
        )}
      </div>
    </div>
  </Form>
);

const mapStateToProps = (state, { hash = '', initialValues, type }) => {
  const { entity, ...schema } = createSchema(state, type);

  return {
    ...schema, entity,
    initialValues: {
      ...initialValues,
      ...(type !== 'create' ? get(state, `entities.${entity}.${hash}`) : {}),
    },
  };
};

export default compose(
  connect(mapStateToProps, { closeModal }),
  reduxForm({
    form: EDIT_FORM_ID,
    onSubmit: ({ hash, ...value }, dispatch, {
      create,
      tableHash,
      tablespaceHash,
      update,
    }): void =>
      dispatch(hash
        ? update(hash, value)
        : create(value)
      ),
  }),
  withHandlers({
    handleClose: ({ closeModal }): func => (event: Object): void =>
      closeModal(EDIT_MODAL_ID),
    handleDelete: ({ dispatch, delete: deleteEntity, hash }): func => (): void =>
      dispatch(deleteEntity(hash)),
  }),
)(EditForm);
