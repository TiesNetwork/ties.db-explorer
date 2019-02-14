import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Table from 'components/Table';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { hasAccounts } from 'entities/accounts';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Services
import { openModal } from 'services/modals';

// Utils
import { capitalize } from 'utils/string';
import createColumns from '../utils/columns';
import createSchema from '../utils/schema';

// Styles
import { Typography } from 'styles';
import styles from './Entities.scss';

const TableEntities = ({
  // Props
  color,
  columns,
  entity,
  id,
  items,
  name,

  // Handlers
  handleCreate,
  handleEdit,

  // State
  isAuthorized,
  isDistributed,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsDistributed]: !!isDistributed,

    [styles.RootVariantIndexes]: id === INDEXES_ENTITY_ID,
    [styles.RootVariantTriggers]: id === TRIGGERS_ENTITY_ID,
  });

  return (
    <div className={rootClassNames}>
      <div className={styles.Header}>
        <Typography
          className={styles.Title}
          variant={Typography.VARIANT.H5}
        >
          <FormattedMessage
            id={entity}
            defaultMessage={capitalize(entity)}
          />
        </Typography>

        <div className={styles.Actions}>
          {isAuthorized && (
            <Button
              color={color}
              onClick={handleCreate}
            >
              <FormattedMessage
                id={`create_${name}`}
                defaultMessage={`Create ${name}`}
              />
            </Button>
          )}
        </div>
      </div>

      {items && items.length > 0 && (
        <div className={styles.Container}>
          <Table
            className={styles.Table}
            columns={columns}
            data={items}
            minRows={0}
            showPagination={false}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, { id, handleEdit, location }) => {
  const match = matchPath(get(location, 'pathname'), {
    path: '/:tablespaceHash/table/:tableHash',
  });

  const schema = createSchema(state, id);

  const tableHash = get(match, 'params.tableHash');
  const tablespaceHash = get(match, 'params.tablespaceHash');

  const table = get(state, `entities.tables.${tableHash}`);

  const isAuthorized = hasAccounts(state);
  const isDistributed = get(table, 'ranges', 0) > 0;

  return {
    ...schema, isAuthorized, isDistributed, tableHash, tablespaceHash,
    columns: createColumns(schema, isDistributed, isAuthorized),
    items: get(table, get(schema, 'entity'), [])
      .map((hash: string, index: number) => ({
        ...get(state, `entities.${get(schema, 'entity')}.${hash}`),
        index: index + 1,
        actions: {
          hash,
          onEdit: handleEdit,
        },
      })),
  };
};

export default withRouter(compose(
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleCreate: ({
      id,
      openModal,
      tableHash,
      tablespaceHash,
    }): func => (): void =>
      openModal(EDIT_MODAL_ID, {
        initialValues: {
          tableHash,
          tablespaceHash,
        },
        type: id,
      }),
    handleEdit: ({
      id,
      openModal,
      tableHash,
      tablespaceHash,
    }): func => (hash: string): void =>
      openModal(EDIT_MODAL_ID, {
        hash,
        initialValues: {
          tableHash,
          tablespaceHash,
        },
        type: id,
      })
  }),
  connect(mapStateToProps),
)(TableEntities));
